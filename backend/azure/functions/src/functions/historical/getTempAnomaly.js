require("dotenv").config({ path: "../../../.env" });
const getMonthRange = require("../utils/getMonthRange");
const API_KEY = process.env.OWM_API_KEY;
const countryCity = require("./countryCity.json");
const geoCoder = require("../utils/geoCoder");

async function getTempAnomaly(month, year, countryCode) {
  console.log("Getting temperature anomaly for", countryCode, month, year);
  const city = countryCity[countryCode] + "," + countryCode;
  const { lat, lon } = await geoCoder(city);
  const threshold = await fetch(
    `https://history.openweathermap.org/data/2.5/aggregated/month?lat=${lat}&lon=${lon}&month=${month}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.result.temp.mean;
    });

  const { lo, hi } = getMonthRange(month, year);

  const anomaly = await fetch(
    `http://history.openweathermap.org/data/2.5/history/accumulated_temperature?lat=${lat}&lon=${lon}&start=${lo}&end=${hi}&threshold=${threshold}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      accTemp = data.list[data.list.length - 1].temp;
      count = data.list[data.list.length - 1].count;
      const anomaly = accTemp / count - threshold;
      console.log(
        "Done. Returning anomaly for",
        countryCode,
        month,
        year,
        ":",
        anomaly
      );
      return anomaly;
    });
  return anomaly;
}

module.exports = getTempAnomaly;
