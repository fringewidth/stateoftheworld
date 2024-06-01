const cheerio = require("cheerio");
const countries = require("./countries.json");

const getNumDays = require("../utils/getNumDays");
const getSentiment = require("./getSentiment");

function getGoogleNewsUrl(country, month, year) {
  country = country.replace(" ", "+");
  return `https://www.google.com/search?q=climate+change+${country}+before%3A${year}-${month}-${getNumDays(
    month
  )}+after%3A${year}-${month}-01`;
}

async function getNews(month, year, code) {
  const country = countries.find((country) => country.code === code);
  const response = await fetch(getGoogleNewsUrl(country.country, month, year));
  const html = await response.text();
  const $ = cheerio.load(html);
  const elements = $("h3").toArray();
  const newsPromises = elements.map(async (elem) => {
    const title = $(elem);
    const headline = title.text();
    const link = title.parents().eq(2).prop("href").slice(7);
    const content = title.parents().eq(3).next().text().split("�")[1] + "...";
    // const sentiment = await getSentiment(headline);
    return { headline, link, content };
  });
  console.log("Getting news for ", country.country, month, year);
  const news = await Promise.all(newsPromises);
  console.log("Getting sentiment for news");
  const sentiments = await getSentiment(news.map((item) => item.headline));
  news.forEach((item, index) => {
    item.sentiment = sentiments[index];
  });
  console.log("Returning news for ", country.country, month, year);
  return news;
}

module.exports = getNews;
