const express = require("express");

const router = express.Router();

const months = require("../models/months");

router.get("/:month/:year", async (req, res) => {
  const month = Number(req.params.month);
  const year = Number(req.params.year);
  try {
    const monthData = await months.find({ month: month, year: year });
    res.json(monthData);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
