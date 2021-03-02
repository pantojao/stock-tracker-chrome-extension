const {retrieveStorage} = require("./handlers/storageHandlers");
const {createTable} = require("./handlers/tableHandlers.js");
const { WatchList, Stock } = require("./classes.js");
const { handleSubmit, handleAddButton } = require("./handlers/eventHandlers");



let watchList = new WatchList();
async function onloadFunction(){
  createTable(watchList);
  watchList = await retrieveStorage(watchList);
  console.log(JSON.stringify(watchList.list.get("nn")), "after update")
}

onloadFunction()

const form = document.getElementById("stock-form");
const button = document.querySelector(".add-stock");
const tickerInput = document.getElementById("ticker");
form.addEventListener("submit", (event) => {
  handleSubmit(event);
});

button.addEventListener("click", ()  => {
  handleAddButton()
});

tickerInput.addEventListener("input", (event) => {
  event.target.setCustomValidity("");
})

