const countries = require("shared/countries.json");
const getTempAnomaly = require("./getTempAnomaly");
const getConc = require("./getConc");
const getNews = require("./getNews");
async function getCountryData(month, year, context) {
  context.log("Getting data for month", month, "year", year);
  const updatedCountries = await Promise.all(
    countries.map(async (country) => {
      const updatedCountry = { ...country };
      updatedCountry.tempAnomaly = await getTempAnomaly(
        month,
        year,
        country.code,
        context
      );
      if (isNaN(updatedCountry.tempAnomaly)) {
        updatedCountry.tempAnomaly = null;
      }
      const concData = await getConc(month, year, country.code, context);
      updatedCountry.coconc = concData.coconc || null;
      updatedCountry.no2conc = concData.no2conc || null;
      updatedCountry.o3conc = concData.o3conc || null;
      updatedCountry.so2conc = concData.so2conc || null;
      updatedCountry.news = await getNews(month, year, country.code, context);
      return updatedCountry;
    })
  );
  return updatedCountries;
}
module.exports = getCountryData;
