const mongoose = require("mongoose");

const monthsSchema = new mongoose.Schema({
  month: Number,
  year: Number,
  countries: [
    {
      code: String,
      country: String,
      tempAnomaly: Number,
      coconc: Number,
      no2conc: Number,
      o3conc: Number,
      so2conc: Number,
      news: [
        {
          headline: String,
          content: String,
          source: String,
          sentiment: Number,
          link: String,
        },
      ],
    },
  ],
});

const monthsModel = new mongoose.model("months", monthsSchema);

module.exports = monthsModel;
