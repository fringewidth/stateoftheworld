// populates database with historical data from January 2024 to April 2024
require("dotenv").config({ path: "../../../.env" });
co.log("process.env.MONGODB_STRING", process.env.MONGODB_STRING);

const monthsModel = require("shared/models/months");
const mongoose = require("mongoose");

const getCountryData = require("./getCountryData");

async function getMonthlyData(month, year, context) {
  context.log(process.env.MONGODB_STRING);
  await mongoose.connect(process.env.MONGODB_STRING).then(async () => {
    context.log("Connected to MongoDB");
    const newMonth = new monthsModel({
      month: month,
      year: year,
      countries: await getCountryData(month, year),
    });
    context.log("Returning countries");
    context.log("Received data for", month, 2024);
    // await newMonth.save();
  });
}

module.exports = getMonthlyData;
