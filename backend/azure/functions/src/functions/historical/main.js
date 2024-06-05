// populates database with historical data from January 2024 to April 2024
require("dotenv").config({ path: "../../.env" });

const monthsModel = require("../../../../../models/months");
const mongoose = require("mongoose");

const getCountryData = require("./getCountryData");

mongoose.connect(process.env.MONGODB_STRING).then(async () => {
  console.log("Connected to MongoDB");
  const months = [1, 2, 3, 4];
  const promises = months.map(async (month) => {
    const newMonth = new monthsModel({
      month: month,
      year: 2024,
      countries: await getCountryData(month, 2024),
    });
    console.log("Returning countries");
    console.log("Saving data for", month, 2024);
    await newMonth.save();
  });

  await Promise.all(promises);
});
