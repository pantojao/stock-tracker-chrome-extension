const axios = require("axios");
const cheerio = require("cheerio");

async function fetchInfo(ticker) {
  console.log("fetching")
  const $ = await fetchHTML(ticker);
  const currentPrice = parseFloat(
    $(".intraday__price").children().last().text()
  );
  const openingPrice = parseFloat(
    $(".list--col50").children().first().find(".primary").text().slice(1)
  );
  return calculateData({ currentPrice, openingPrice });
}

async function fetchName(ticker) {
  console.log("fetching Name")
  const $ = await fetchHTML(ticker);
  const name = $(".company__name").text();
  return name ? name : false;
}

async function fetchHTML(ticker) {
  const url = `https://www.marketwatch.com/investing/fund/${ticker}`;
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

function calculateData(priceData) {
  const { openingPrice, currentPrice } = priceData;
  const difference = (currentPrice - openingPrice).toFixed(2);
  const percentageChange = (
    (difference / Math.abs(currentPrice)) *
    100
  ).toFixed(2);

  return { difference, percentageChange, openingPrice, currentPrice };
}

module.exports = {
  fetchInfo,
  fetchHTML,
  calculateData,
  fetchName,
};
