const { fetchInfo } = require("./getData");

class Stock {
  constructor(ticker, minimum = 0, maximum = Infinity, name = null) {
    this.ticker = ticker;
    this.minimum = minimum;
    this.maximum = maximum;
    this.name = name;
    this.current = null;
    this.opening = null;
    this.difference = null;
  }

  async updatePrice() {
    const priceData = await fetchInfo(this.ticker);
    // this.checkForAlert(priceData);
    const { difference, percentageChange, openingPrice, currentPrice } = data;
    this.current = currentPrice;
    this.opening = openingPrice;
    this.percentageChange = percentageChange;
    this.difference = difference;
  }

  checkForAlert(data) {
    const currentPrice = data.currentPrice;
    if (currentPrice >= this.maximum) {
      this.maximum = Infinity;
      alert("Current Price Is Above Maximum" + this.maximum);
    } else if (currentPrice <= this.minimum) {
      this.minimum = -Infinity;
      alert("Current Price Is Below Minimum:" + this.minimum);
    }
  }
}

class WatchList {
  constructor() {
    this.list = new Set();
  }

  addStock(stock) {
    if (!this.list.has(stock)) {
      this.list.add(stock);
    } else {
      throw new Error("Already Have Stock In Watch List");
    }
  }

  removeStock(stock) {
    this.list.delete(stock);
  }

  async updatePrices() {
    const promises = this.list.forEach(async (stock) => {
      await stock.updatePrice();
    });
  }
}

module.exports = { WatchList, Stock };
