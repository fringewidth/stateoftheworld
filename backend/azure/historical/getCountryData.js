const countries = require("./countries.json");
const getTempAnomaly = require("./getTempAnomaly");
function getCountryData(month, year) {
  countries.forEach(async (country) => {
    getTempAnomaly(month, year, country.code).then((anomaly) => {
      country.tempAnomaly = anomaly;
    });
    getConc(month, year, country.code).then((data) => {
      country.coconc = data.coconc;
      country.no2conc = data.no2conc;
      country.o3conc = data.o3conc;
      country.so2conc = data.so2conc;
    });
    getNews(month, year, country.code).then((news) => {
      country.news = news;
    });
  });
  return countries;
}
module.exports = getCountryData;
