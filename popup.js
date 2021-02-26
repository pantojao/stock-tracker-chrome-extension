const { WatchList, Stock } = require("./classes.js");
const {handleSubmit} = require('./handleSubmit')

const form = document.getElementById("stock-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSubmit(event)
});



// function retrieveStorage() {
//   let items = { ...localStorage };
//   for (const [ticker, info] of Object.entries(items)) {
//     let { min, max, name } = JSON.parse(info);
//     let stock = new Stock(ticker, min, max, name);
//     watchList.addStock(stock);
//   }
// }
