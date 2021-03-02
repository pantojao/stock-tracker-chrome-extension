const { fetchInfo } = require("./handlers/getData");

class Stock {
  constructor(ticker, minimum = 0, maximum = Infinity, name = null) {
    this.ticker = ticker;
    this.minimum = minimum;
    this.maximum = maximum;
    this.name = name;
    this.price = null;
    this.opening = null;
    this.change = null;
    this.percentageChange = null;
  }

  async updatePrice() {
    const priceData = await fetchInfo(this.ticker);
    this.price = priceData.currentPrice;
    this.opening = priceData.openingPrice;
    this.percentageChange = priceData.percentageChange;
    this.change = priceData.difference;
  }
}

class WatchList {
  constructor() {
    this.list = new Map();
  }

  addStock(ticker, stockInfo) {
    this.list.set(ticker,stockInfo);
  }

  removeStock(stock) {
    this.list.delete(stock);
  }

  async updatePrices() {
    let allStocks = [...this.list]
    const promises = allStocks.map(async ([ticker, stock]) => {
      await stock.updatePrice();
    });
    await Promise.all(promises)
  }
}

module.exports = { WatchList, Stock };
