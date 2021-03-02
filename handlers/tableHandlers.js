const { storeInlocal } = require("./storageHandlers");

function createTable(list) { 
    const body = document.querySelector("body");
    let table = document.createElement("table");
    table.classList.add("stock-info");

    const tableHeaders = document.createElement("tr");
    const headers = ["Ticker", "Name", "Price", "Change", "% Change"];

    for (const header of headers) {
      let currentHeader = document.createElement("th");
      currentHeader.appendChild(document.createTextNode(header));
      tableHeaders.appendChild(currentHeader);
    }
    table.appendChild(tableHeaders);

    for (let [ticker, stock] of list.list) {
      let tableRow = document.createElement("tr");
      let columns = createColumns(stock);
      for (let column of columns) {
        tableRow.appendChild(column);
      }
      table.appendChild(tableRow);
    }
    body.appendChild(table);
}

function createColumns(currentStock) {

  let ticker = document.createElement("td");
  ticker.appendChild(document.createTextNode(currentStock.ticker));
  let name = document.createElement("td");
  name.appendChild(document.createTextNode(currentStock.name));

  let price = document.createElement("td");
  price.appendChild(document.createTextNode(`${currentStock.price}`));
  price.style.fontWeight = "bold";

  let change = document.createElement("td");
  change.appendChild(document.createTextNode(`${currentStock.change}`));

  let percentageChange = document.createElement("td");
  percentageChange.appendChild(
    document.createTextNode(`${currentStock.percentageChange}` + "%")
  );

  if (currentStock.change < 0) {
    change.classList.add("red-text");
    percentageChange.classList.add("red-text");
  } else {
    change.classList.add("green-text");
    percentageChange.classList.add("green-text");
  }
  return [ticker, name, price, change, percentageChange];
}



module.exports = {
  createColumns,
  createTable
};





// let testList = new WatchList();
// let spy = new Stock("spy", 0, 1999, "SPDR S&P 500 ETF Trust");
// let tesla = new Stock("tsla", 0, 1999, "Tesla");
// tesla.price = 1900;
// tesla.opening = 1800;
// tesla.change = 100;
// tesla.percentageChange = "10";
// spy.price = 1900;
// spy.opening = 1800;
// spy.change = -100;
// spy.percentageChange = "-10";
// testList.addStock(spy);
// testList.addStock(tesla);





// function createTable(list) {
//   let table = document.createElement("table");
//   table.classList.add("stock-info");

//   const tableHeaders = document.createElement("tr");
//   const headers = ["Ticker", "Name", "Price", "Change", "% Change"];

//   for (const header of headers) {
//     let currentHeader = document.createElement("th");
//     currentHeader.appendChild(document.createTextNode(header));
//     tableHeaders.appendChild(currentHeader);
//   }

//   table.appendChild(tableHeaders);

//   for (let stock of list.list) {
//     let tableRow = document.createElement("tr");
//     let columns = createColumns(stock);
//     for (let column of columns) {
//       tableRow.appendChild(column);
//     }
//     table.appendChild(tableRow);
//   }
//   body.appendChild(table);
// }

// function createColumns(stock) {
//   let ticker = document.createElement("td");
//   ticker.appendChild(document.createTextNode(stock.ticker));
//   let name = document.createElement("td");
//   name.appendChild(document.createTextNode(stock.name));

//   let price = document.createElement("td");
//   price.appendChild(document.createTextNode(stock.price));
//   price.style.fontWeight = "bold";

//   let change = document.createElement("td");
//   change.appendChild(document.createTextNode(stock.change));

//   let percentageChange = document.createElement("td");
//   percentageChange.appendChild(
//     document.createTextNode(stock.percentageChange + "%")
//   );

//   if (stock.change < 0) {
//     change.classList.add("red-text");
//     percentageChange.classList.add("red-text");
//   } else {
//     change.classList.add("green-text");
//     percentageChange.classList.add("green-text");
//   }
//   return [ticker, name, price, change, percentageChange];
// }
