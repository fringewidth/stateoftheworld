const cheerio = require("cheerio");
const countries = require("../../../shared/countries.json");
const getNumDays = require("../utils/getNumDays");
const getSentiment = require("./getSentiment");

function getGoogleNewsUrl(country, month, year) {
  const query = encodeURIComponent(`climate change news ${country}`);
  const endDay = getNumDays(month, year);
  return `https://www.google.com/search?q=${query}+before%3A${year}-${month}-${endDay}+after%3A${year}-${month}-01&tbm=nws`;
}

async function getNews(month, year, code) {
  const country = countries.find((c) => c.code === code);
  console.log(`Getting news for ${country.country} ${month}/${year}`);

  const response = await fetch(getGoogleNewsUrl(country.country, month, year), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  // Google News structure often uses h3 for headlines
  const news = [];
  $("h3").each((i, el) => {
    const headline = $(el).text();
    // In search results, the link is usually the closest parent anchor
    let link = $(el).closest("a").attr("href") || "";
    if (link.startsWith("/url?q=")) {
      link = link.slice(7).split("&sa=")[0];
    }

    // The snippet is usually in a div with class BNeawe or similar in the same result block
    const parentBlock = $(el).closest(".kCrYT").parent();
    const snippetDiv = parentBlock.find(".BNeawe.s3v9rd.AP7Wnd").first();
    const content = snippetDiv.text() || "";

    if (headline && link) {
      news.push({ headline, link, content });
    }
  });

  // Limit to top 5-10 stories to keep it fast
  const topNews = news.slice(0, 8);

  console.log("Getting sentiment for news");
  const sentiments = await getSentiment(topNews.map((item) => item.headline));
  topNews.forEach((item, index) => {
    item.sentiment = sentiments[index];
  });

  return topNews;
}

module.exports = getNews;
