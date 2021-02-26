
const { fetchStock } = require('./getData')

class Stock {
  constructor(ticker, minimum = 0, maximum = Infinity, percentageChange = null){
    this.ticker = ticker
    this.minimum = minimum 
    this.maximum = maximum 
    this.percentageChange = percentageChange
  }

  async updatePrice(){
    const priceData = await fetchStock(this.ticker);
    const alert = this.checkForAlert(priceData)

    if (alert) {
      alert(alert)
    }
    
    console.log(priceData, alert)
  }

  checkForAlert(data){
    const {difference, percentageChange, openingPrice, currentPrice} = data
    
    if (currentPrice >= this.maximum){
      return "Current Price Is Above Maximum" + this.maximum
    } else if (currentPrice <= this.minimum){
      return "Current Price Is Below Minimum:" + this.minimum
    } else if (percentageChange >= Math.abs(this.percentageChange)){
      return "Percentage Change Is At" + this.percentageChange
    } else {
      return false 
    }
  }

}

class WatchList {
  constructor(){
    this.list = new Set()
  }

  addStock(stock){
    if (!this.list.has(stock)){
      this.list.add(stock)
    } else {
      throw new Error("Already Have Stock In Watch List")
    }
  }

  removeStock(stock){
    this.list.delete(stock)
  }

  async updatePrices(){
      const promises = this.list.forEach(async (stock) => {
        console.log(stock.ticker)
        await stock.updatePrice()
      })
  }
}

const spy = new Stock("spy")
const amc = new Stock("amc")


const watchList = new WatchList()

watchList.addStock(spy)
watchList.addStock(amc)


watchList.updatePrices()




