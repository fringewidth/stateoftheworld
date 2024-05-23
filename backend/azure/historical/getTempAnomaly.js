require("dotenv").config({ path: "../../.env" });
const getMonthRange = require("../utils/getMonthRange");
const API_KEY = process.env.OWM_API_KEY;
const countryCity = require("./countryCity.json");

async function getTempAnomaly(month, year, countryCode) {
  const city = countryCity[countryCode] + "," + countryCode;
  const threshold = await fetch(
    `https://history.openweathermap.org/data/2.5/aggregated/month?q=${city}&month=${month}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.result.temp.mean;
    });

  const { lo, hi } = getMonthRange(month, year);

  const anomaly = await fetch(
    `http://history.openweathermap.org/data/2.5/history/accumulated_temperature?q=${city}&start=${lo}&end=${hi}&threshold=${threshold}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      accTemp = data.list[data.list.length - 1].temp;
      count = data.list[data.list.length - 1].count;
      return accTemp / count - threshold;
    });
  return anomaly;
}

module.exports = getTempAnomaly;
