require("dotenv").config({ path: "../../.env" });
const API_KEY = process.env.OWM_API_KEY;
const countryCity = require("./countryCity.json");

function getNumDays(month) {
  if (month == 2) return 28;
  if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
  return 31;
}

async function getTempAnomaly(month, year, countryCode) {
  const city = countryCity[countryCode] + "," + countryCode;
  const threshold = await fetch(
    `https://history.openweathermap.org/data/2.5/aggregated/month?q=${city}&month=${month}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.result.temp.mean;
    });

  const lo = new Date(year, month - 1, 1).getTime() / 1000;
  const hi =
    new Date(year, month - 1, getNumDays(month), 23, 59, 59).getTime() / 1000;

  const anomaly = await fetch(
    `http://history.openweathermap.org/data/2.5/history/accumulated_temperature?q=${city}&start=${lo}&end=${hi}&threshold=${threshold}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      accTemp = data.list[data.list.length - 1].temp;
      count = data.list[data.list.length - 1].count;
      return accTemp / count - threshold;
    });
  return (anomaly * 5) / 9;
}

module.exports = getTempAnomaly;
