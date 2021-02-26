
const { fetchName } = require("./getData");
const { WatchList, Stock } = require("./classes.js");

let watchList = new WatchList();

 async function handleSubmit(event){
  const ticker = document.getElementById("ticker").value;
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;

  if (localStorage[ticker]) {
    console.log("Already Tracking");
    document.getElementById("ticker").setCustomValidity("Already On Watchlist");
    return;
  }

  const name = await fetchName(ticker);
  console.log(name)

  if (name) {
    const stock = new Stock(ticker, min, max, name);
    watchList.addStock(stock);
    storeInlocal(ticker, min, max, name);
  } else {
    console.log("invalid");
    document
      .getElementById("ticker")
      .setCustomValidity("Sorry, Could Not Find Stock");
  }
}

function storeInlocal(ticker, min, max, name) {
  let information = JSON.stringify({ min: min, max: max, name: name });
  localStorage.setItem(ticker, information);
  watchList.addStock();
}

module.exports = {handleSubmit}