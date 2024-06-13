const express = require("express");
const nodeCache = require("node-cache");
const dbCache = new nodeCache({ stdTTL: 3600 });
const router = express.Router();

const months = require("shared/models/months");

router.get("/:month/:year", async (req, res) => {
  const month = req.params.month;
  const year = req.params.year;

  if (dbCache.has(month + year)) {
    res.json(dbCache.get(month + year));
    return;
  }
  try {
    const monthData = await months.find({ month: +month, year: +year });
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

    dbCache.set(month + year, monthData);
    res.set("Cache-Control", "public, max-age=43200"); // browser will cache it for a day
    res.json(monthData);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
