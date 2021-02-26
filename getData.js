
const axios = require("axios");
const cheerioModule = require("cheerio");
const cheerio = require("cheerio");

function calculateData(priceData) {
  const { openingPrice, currentPrice } = priceData;
  const difference = (currentPrice - openingPrice).toFixed(2);
  const percentageChange = (
    ((difference) / Math.abs(currentPrice)) *100
  ).toFixed(2);

  return {difference, percentageChange, openingPrice, currentPrice}
}

async function fetchStock(ticker) {
  let url = `https://www.marketwatch.com/investing/fund/${ticker}`;
  const $ = await fetchHTML(url);
  const currentPrice = parseFloat(
    $(".intraday__price").children().last().text()
  );
  const openingPrice = parseFloat(
    $(".list--col50").children().first().find(".primary").text().slice(1)
  );

  return calculateData({currentPrice, openingPrice});
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

module.exports = {
  fetchStock,
  fetchHTML,
  calculateData
}