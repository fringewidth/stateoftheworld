const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./lib/db");
const months = require("../shared/models/months");
const countryData = require("../shared/countries.json");

const app = express();
app.use(cors());
app.use(express.json());

// Main API handler
app.get("/months/:month/:year", async (req, res) => {
  const { month, year } = req.params;

  try {
    await connectToDatabase();
    const monthData = await months.find({ month: +month, year: +year });

    if (!monthData || monthData.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    // For Global Data Calculation (Ported from monthsRoute.js)
    let global = {
      code: "global",
      country: "Global",
      tempAnomaly: 0,
      coconc: 0,
      no2conc: 0,
      o3conc: 0,
      so2conc: 0,
      news: [],
    };

    let countries = monthData[0].countries;
    let length = countries.length;

    countries.forEach((country) => {
      global.tempAnomaly += (country.tempAnomaly || 0) / length;
      global.coconc += (country.coconc || 0) / length;
      global.no2conc += (country.no2conc || 0) / length;
      global.o3conc += (country.o3conc || 0) / length;
      global.so2conc += (country.so2conc || 0) / length;
      global.news = global.news.concat(country.news || []);
    });

    monthData[0].countries.push(global);

    res.setHeader("Cache-Control", "public, max-age=43200");
    res.json(monthData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/co2", async (req, res) => {
  try {
    const response = {};
    response.countries = countryData.reduce((acc, curr) => {
      acc[curr.code] = curr["2020co2"];
      return acc;
    }, {});
    response.countries.global = 4.465;
    response.min = Math.min(...Object.values(response.countries));
    response.max = Math.max(...Object.values(response.countries));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.json({ message: "State of the World API" });
});

module.exports = app;
