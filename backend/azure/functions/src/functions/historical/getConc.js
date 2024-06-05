require("dotenv").config({ path: "../../../.env" });
const getMonthRange = require("../utils/getMonthRange");
const API_KEY = process.env.OWM_API_KEY;
const countryCity = require("./countryCity.json");
const geoCoder = require("../utils/geoCoder");

async function getConc(month, year, countryCode) {
  // console.log("Getting concentration data for", countryCode, month, year);
  const city = countryCity[countryCode] + "," + countryCode;
  const { lat, lon } = await geoCoder(city);

  const { lo, hi } = getMonthRange(month, year);
  return await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${lo}&end=${hi}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const conc = data.list.reduce(
        (acc, ele) => {
          acc.coconc += ele.components.co;
          acc.no2conc += ele.components.no2;
          acc.o3conc += ele.components.o3;
          acc.so2conc += ele.components.so2;
          return acc;
        },
        { coconc: 0, no2conc: 0, o3conc: 0, so2conc: 0 }
      );
      const numEntries = data.list.length;
      conc.coconc /= numEntries;
      conc.no2conc /= numEntries;
      conc.o3conc /= numEntries;
      conc.so2conc /= numEntries;
      // console.log(
      //   "Done. Returning concentration data for",
      //   countryCode,
      //   month,
      //   year,
      //   ":",
      //   conc
      // );
      return conc;
    });
}

module.exports = getConc;
