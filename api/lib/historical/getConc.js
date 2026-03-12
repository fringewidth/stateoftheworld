const getMonthRange = require("../utils/getMonthRange");
const geoCoder = require("../utils/geoCoder");
const countryCity = require("./countryCity.json");

const API_KEY = process.env.OWM_API_KEY;

async function getConc(month, year, countryCode) {
  console.log(`Getting concentration data for ${countryCode} ${month}/${year}`);
  const city = countryCity[countryCode] + "," + countryCode;
  const { lat, lon } = await geoCoder(city);

  const { lo, hi } = getMonthRange(month, year);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${lo}&end=${hi}&appid=${API_KEY}`,
  );
  const data = await response.json();

  if (!data.list || data.list.length === 0) {
    return { coconc: 0, no2conc: 0, o3conc: 0, so2conc: 0 };
  }

  const conc = data.list.reduce(
    (acc, ele) => {
      acc.coconc += ele.components.co || 0;
      acc.no2conc += ele.components.no2 || 0;
      acc.o3conc += ele.components.o3 || 0;
      acc.so2conc += ele.components.so2 || 0;
      return acc;
    },
    { coconc: 0, no2conc: 0, o3conc: 0, so2conc: 0 },
  );

  const numEntries = data.list.length;
  conc.coconc /= numEntries;
  conc.no2conc /= numEntries;
  conc.o3conc /= numEntries;
  conc.so2conc /= numEntries;

  return conc;
}

module.exports = getConc;
