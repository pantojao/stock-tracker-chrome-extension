
const { fetchName } = require("./getData");


async function handleSubmit(event){
  event.preventDefault();
  document.getElementById("ticker").setCustomValidity("");

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
    console.log("valid")
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
}

module.exports = {handleSubmit}