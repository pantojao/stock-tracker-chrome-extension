
const { fetchName } = require("./getData");
const {storeInlocal} = require('./storageHandlers')

async function handleSubmit(event){
  event.preventDefault();
  document.getElementById("ticker").setCustomValidity("");

  const ticker = document.getElementById("ticker").value;
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;
  const tickerInput = document.getElementById("ticker")

  const name = await fetchName(ticker);

  if (localStorage[ticker]) {
    tickerInput.setCustomValidity("Already On Watchlist");
    tickerInput.reportValidity()
    return;
  } else if (name) {
    storeInlocal(ticker, min, max, name);
  } else {
    tickerInput.setCustomValidity("Sorry, Could Not Find Stock");
    tickerInput.reportValidity()
  }
}

function handleAddButton() {
  // const table = document.querySelector(".stock-info");
  const form = document.getElementById("stock-form");
  const button = document.querySelector(".add-stock");
  if (form.style.display === "flex") {
    // table.style.display = "none";
    form.style.display = "none";
    button.textContent = "Add Stock";
  } else {
    // table.style.display = "table";
    form.style.display = "flex";
    button.textContent = "View Stocks";
  }
}




module.exports = {handleSubmit, handleAddButton}