const { fetchInfo } = require("./getData");

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
    // this.checkForAlert(priceData);
    const { change, percentageChange, openingPrice, price } = data;
    this.price = price;
    this.opening = openingPrice;
    this.percentageChange = percentageChange;
    this.change = change;
  }

  checkForAlert(data) {
    const currentPrice = data.price;
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
