const { fetchInfo } = require("./getData");

class Stock {
  constructor(ticker, minimum = 0, maximum = Infinity, name = null) {
    this.ticker = ticker;
    this.minimum = minimum;
    this.maximum = maximum;
    this.name = name;
  }

  async updatePrice() {
    const priceData = await fetchInfo(this.ticker);
    const alert = this.checkForAlert(priceData);
    if (alert) {
      alert(alert);
    }
  }

  checkForAlert(data) {
    const { difference, percentageChange, openingPrice, currentPrice } = data;

    if (currentPrice >= this.maximum) {
      this.maximum = Infinity;
      return "Current Price Is Above Maximum" + this.maximum;
    } else if (currentPrice <= this.minimum) {
      this.minimum = -Infinity;
      return "Current Price Is Below Minimum:" + this.minimum;
    } else {
      return false;
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
      console.log(stock.ticker);
      await stock.updatePrice();
    });
  }
}

module.exports = { WatchList, Stock };
