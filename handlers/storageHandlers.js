const { Stock, WatchList } = require("../classes.js");

async function retrieveStorage(watchList) {
  const items =   {...localStorage};

let promises = Object.entries(items).map(async([ticker, info]) => {
    let { min, max, name } = await JSON.parse(info);
    let stock = new Stock(ticker, min, max, name);
    await watchList.addStock(ticker, stock);
  })

  Promise.all(promises)
  return watchList
}


function storeInlocal(ticker, min, max, name) {
  let information = JSON.stringify({ min: min, max: max, name: name });
  localStorage.setItem(ticker, information);
}


module.exports = {
  retrieveStorage,
  storeInlocal
};