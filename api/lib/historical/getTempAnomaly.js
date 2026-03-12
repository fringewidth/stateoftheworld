const getNumDays = require("../utils/getNumDays");
const geoCoder = require("../utils/geoCoder");
const countryCity = require("./countryCity.json");

const API_KEY = process.env.OWM_API_KEY;

/**
 * Refactored to use One Call 3.0 day_summary to calculate monthly average.
 * Since One Call 3.0 doesn't provide a 40-year baseline directly,
 * we still try to use the 2.5 aggregated API for baseline if the key allows it.
 */
async function getTempAnomaly(month, year, countryCode) {
  console.log(
    `Getting temperature anomaly for ${countryCode} ${month}/${year} using One Call 3.0`,
  );
  const city = countryCity[countryCode] + "," + countryCode;
  const { lat, lon } = await geoCoder(city);

  // 1. Get the Baseline (Statistical average for the month over 40 years)
  let baseline = 288; // Fallback approx 15C
  try {
    const thresholdRes = await fetch(
      `https://history.openweathermap.org/data/2.5/aggregated/month?lat=${lat}&lon=${lon}&month=${month}&appid=${API_KEY}`,
    );
    const thresholdData = await thresholdRes.json();
    if (thresholdData.result && thresholdData.result.temp) {
      baseline = thresholdData.result.temp.mean;
      console.log(`Baseline for ${countryCode} found: ${baseline}K`);
    } else {
      console.warn(
        `Baseline data missing in response for ${countryCode}, using fallback.`,
      );
    }
  } catch (e) {
    console.warn(
      `Could not fetch baseline for ${countryCode}: ${e.message}. Using fallback.`,
    );
  }

  // 2. Fetch Daily Summaries for the entire month to calculate the actual average
  const numDays = getNumDays(month);
  let totalTemp = 0;
  let count = 0;

  for (let day = 1; day <= numDays; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${dateStr}&appid=${API_KEY}`,
      );
      if (!res.ok) {
        console.error(`Error fetching ${dateStr}: Status ${res.status}`);
        continue;
      }
      const dayData = await res.json();
      if (dayData && dayData.temperature && dayData.temperature.afternoon) {
        const dailyAvg =
          (dayData.temperature.morning +
            dayData.temperature.afternoon +
            dayData.temperature.evening +
            dayData.temperature.night) /
          4;
        totalTemp += dailyAvg;
        count++;
      }
    } catch (e) {
      console.error(`Fetch exception for ${dateStr}: ${e.message}`);
    }
  }

  if (count === 0) {
    console.error(
      `Failed to fetch any temperature data for ${countryCode} ${month}/${year}`,
    );
    return 0;
  }

  const monthlyActual = totalTemp / count;
  const anomaly = monthlyActual - baseline;

  console.log(
    `Summary for ${countryCode}: Actual=${monthlyActual.toFixed(2)}K, Baseline=${baseline.toFixed(2)}K, Anomaly=${anomaly.toFixed(2)}K`,
  );
  return anomaly;
}

module.exports = getTempAnomaly;
