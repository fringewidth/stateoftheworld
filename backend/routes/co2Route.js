const express = require("express");

const router = express.Router();

const countryData = require("../azure/historical/countries.json");

router.get("/:countryCode", async (req, res) => {
  try {
    let countryco2;
    if (req.params.countryCode === "global") {
      countryco2 = 4.07;
    } else {
      countryco2 = countryData.find(
        (country) => country.code === req.params.countryCode
      )["2020co2"];
    }
    res.json({ co2TonsPerCapita: countryco2 });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
