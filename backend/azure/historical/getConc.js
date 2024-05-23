require("dotenv").config({ path: "../../.env" });
const { get } = require("mongoose");
const getMonthRange = require("../utils/getMonthRange");
const API_KEY = process.env.OWM_API_KEY;
const countryCity = require("./countryCity.json");

async function getConc(month, year, countryCode) {
  const city = countryCity[countryCode] + "," + countryCode;
  const { lat, lon } = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return { lat: data[0].lat, lon: data[0].lon };
    });

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
      return conc;
    });
}

module.exports = getConc;
