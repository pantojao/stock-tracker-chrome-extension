const { WatchList, Stock } = require("./classes.js");
const {handleSubmit} = require('./handleSubmit')



window.onload = function(){
  const list = retrieveStorage()
  list.updatePrices()
  console.log(list)
}

const form = document.getElementById("stock-form");
const button = document.querySelector(".add-stock")
const ticker = document.getElementById("ticker")

form.addEventListener("submit", function (event) {
  console.log("submited")
  handleSubmit(event)
});




button.addEventListener("click", function(){
    if (form.style.display === "flex"){
      form.style.display = "none"
      button.textContent = "Add Stock"

    } else {
      form.style.display = "flex"
      button.textContent = "View Stocks"
    }
    console.log(form.style.display == "none")
})


function retrieveStorage() {
  let watchList = new WatchList()
  let items = { ...localStorage };
  for (const [ticker, info] of Object.entries(items)) {
    let { min, max, name } = JSON.parse(info);
    let stock = new Stock(ticker, min, max, name);
    watchList.addStock(stock);
  }

  return watchList
}
