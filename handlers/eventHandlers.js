
const { fetchName } = require("./getData");
const {storeInlocal} = require('./storageHandlers')

async function handleSubmit(event){
  event.preventDefault();
  document.getElementById("ticker").setCustomValidity("");

  const ticker = document.getElementById("ticker").value;
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;
  
  if (localStorage[ticker]) {
    document.getElementById("ticker").setCustomValidity("Already On Watchlist");
    return;
  }             
  
  const name = await fetchName(ticker);
  if (name) {
    storeInlocal(ticker, min, max, name);
  } else {
    document
      .getElementById("ticker")
      .setCustomValidity("Sorry, Could Not Find Stock");
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