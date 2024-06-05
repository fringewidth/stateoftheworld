const monthsModel = require("shared/models/months");
const mongoose = require("mongoose");

const getCountryData = require("./getCountryData");

async function getMonthlyData(month, year, context) {
  await mongoose.connect(process.env.MONGODB_STRING).then(async () => {
    context.log("Connected to MongoDB");
    const newMonth = new monthsModel({
      month: month,
      year: year,
      countries: await getCountryData(month, year, context),
    });
    context.log("Returning countries");
    context.log("Received data for", month, 2024);
    // await newMonth.save();
  });
}

module.exports = getMonthlyData;
