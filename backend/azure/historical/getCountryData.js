const countries = require("./countries.json");
const getTempAnomaly = require("./getTempAnomaly");
function getCountryData(month, year) {
  countries.forEach(async (country) => {
    getTempAnomaly(month, year, country.code).then((anomaly) => {
      country.tempAnomaly = anomaly;
    });
    getConc(month, year, country.code, "co").then((conc) => {
      country.coconc = conc;
    });
    getConc(month, year, country.code, "no").then(
      (conc) => (country.no2conc = conc)
    );
    getNews(month, year, country.code).then((news) => {
      country.news = news;
    });
  });
  return countries;
}

module.exports = getCountryData;
