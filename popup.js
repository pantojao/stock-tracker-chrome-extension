const { WatchList, Stock } = require("./classes.js");
const { handleSubmit } = require("./handleSubmit");

const watchList = new WatchList();

window.onload = function () {
  retrieveStorage();
  // watchList.updatePrices();
  createTable();
};

const body = document.querySelector("body");
const form = document.getElementById("stock-form");
const button = document.querySelector(".add-stock");
const table = document.querySelector(".stock-info");
const ticker = document.getElementById("ticker");

form.addEventListener("submit", (event) => {
  handleSubmit(event);
});

button.addEventListener("click", function () {
  if (table.style.display === "table") {
    table.style.display = "none";
    form.style.display = "none";
    button.textContent = "Add Stock";
  } else {
    table.style.display = "table";
    form.style.display = "flex";
    button.textContent = "View Stocks";
  }
});

function retrieveStorage() {
  const items = { ...localStorage };
  for (const [ticker, info] of Object.entries(items)) {
    let { min, max, name } = JSON.parse(info);
    let stock = new Stock(ticker, min, max, name);
    watchList.addStock(stock);
  }
}

function createTable() {
  let table = document.createElement("table");
  table.classList.add("stock-info");
  console.log(testList);
  const tableHeaders = document.createElement("tr");
  const headers = ["Ticker", "Name", "Price", "Change", "% Change"];

  for (const header of headers) {
    let currentHeader = document.createElement("th");
    currentHeader.appendChild(document.createTextNode(header));
    tableHeaders.appendChild(currentHeader);
  }
  table.appendChild(tableHeaders);

  for (let stock of testList.list) {
    let tableRow = document.createElement("tr");
    let columns = createColumns(stock);
    for (let column of columns) {
      tableRow.appendChild(column);
    }
    table.appendChild(tableRow);
  }
  body.appendChild(table);
}

function createColumns(stock) {
  let ticker = document.createElement("td");
  ticker.appendChild(document.createTextNode(stock.ticker));
  let name = document.createElement("td");
  name.appendChild(document.createTextNode(stock.name));

  let price = document.createElement("td");
  price.appendChild(document.createTextNode(stock.price));

  price.style.fontWeight = "bold";

  let change = document.createElement("td");
  change.appendChild(document.createTextNode(stock.change));

  let percentageChange = document.createElement("td");
  percentageChange.appendChild(
    document.createTextNode(stock.percentageChange + "%")
  );

  if (stock.change < 0) {
    change.classList.add("red-text");
    percentageChange.classList.add("red-text");
  } else {
    change.classList.add("green-text");
    percentageChange.classList.add("green-text");
  }

  return [ticker, name, price, change, percentageChange];
}






let testList = new WatchList();
let spy = new Stock("spy", 0, 1999, "SPDR S&P 500 ETF Trust");
let tesla = new Stock("tsla", 0, 1999, "Tesla");
tesla.price = 1900;
tesla.opening = 1800;
tesla.change = 100;
tesla.percentageChange = "10";
spy.price = 1900;
spy.opening = 1800;
spy.change = -100;
spy.percentageChange = "-10";
testList.addStock(spy);
testList.addStock(tesla);