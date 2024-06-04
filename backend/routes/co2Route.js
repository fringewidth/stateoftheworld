const express = require("express");

const router = express.Router();

const countryData = require("../azure/historical/countries.json");

router.get("/", async (req, res) => {
  try {
    const response = countryData.reduce((acc, curr) => {
      acc[curr.code] = curr["2020co2"];
      return acc;
    }, {});
    response.global = 4.465;

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
