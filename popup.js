const { WatchList, Stock } = require("./classes.js");
const { handleSubmit, handleAddButton } = require("./handlers/eventHandlers");
const {retrieveStorage} = require("./handlers/storageHandlers");
const {createTable} = require("./handlers/tableHandlers.js");

let watchList = new WatchList();

async function onloadFunction(){
  watchList = await retrieveStorage(watchList);

  await watchList.updatePrices();

  let test = setTimeout(async() => {
    console.log(Object.keys(watchList.list))
    
    await createTable(watchList);
  }, 6000)
  
}

onloadFunction()

const form = document.getElementById("stock-form");
const button = document.querySelector(".add-stock");

form.addEventListener("submit", (event) => {
  handleSubmit(event);
});

button.addEventListener("click", ()  => {
  handleAddButton()
});

