// populates database with historical data from January 2024 to April 2024
require("dotenv").config({ path: "../../.env" });

const monthsModel = require("../models/months");
const mongoose = require("mongoose");

const getCountryData = require("./getCountryData");

mongoose.connect(process.env.MONGODB_STRING).then(() => {
  const months = [1, 2, 3, 4];
  months.forEach(async (month) => {
    const newMonth = new monthsModel({
      month: month,
      year: 2024,
      countries: await getCountryData(month, 2025),
    });

    await newMonth.save();
  });
});
