const express = require("express");

const router = express.Router();

const months = require("../models/months");

router.get("/:month/:year", async (req, res) => {
  const month = Number(req.params.month);
  const year = Number(req.params.year);
  try {
    const monthData = await months.find({ month: month, year: year });
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

    let length = monthData[0].countries.length;

    monthData[0].countries.forEach((country) => {
      global.tempAnomaly += country.tempAnomaly / length;
      global.coconc += country.coconc / length;
      global.no2conc += country.no2conc / length;
      global.o3conc += country.o3conc / length;
      global.so2conc += country.so2conc / length;
      global.news = global.news.concat(country.news);
    });

    monthData[0].countries.push(global);

    res.json(monthData);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
