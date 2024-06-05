const cheerio = require("cheerio");
const countries = require("shared/countries.json");

const getNumDays = require("../utils/getNumDays");
const getSentiment = require("./getSentiment");

function getGoogleNewsUrl(country, month, year, context) {
  country = country.replace(" ", "+");
  return `https://www.google.com/search?q=climate+change+news+${country}+before%3A${year}-${month}-${getNumDays(
    month
  )}+after%3A${year}-${month}-01`;
}

async function getNews(month, year, code, context) {
  const country = countries.find((country) => country.code === code);
  const response = await fetch(getGoogleNewsUrl(country.country, month, year));
  const html = await response.text();
  const $ = cheerio.load(html);
  const elements = $("h3").toArray();
  const newsPromises = elements.map(async (elem) => {
    const title = $(elem);
    const headline = title.text();
    const link = title.parents().eq(2).prop("href").slice(7).split("&sa")[0];
    const content = title.parents().eq(3).next().text().split("�")[1] + "...";
    return { headline, link, content };
  });
  context.log("Getting news for ", country.country, month, year);
  const news = await Promise.all(newsPromises);
  context.log("Getting sentiment for news");
  const sentiments = await getSentiment(news.map((item) => item.headline));
  news.forEach((item, index) => {
    item.sentiment = sentiments[index];
  });
  context.log("Returning news for ", country.country, month, year);
  context.log(news);
  return news;
}

module.exports = getNews;
