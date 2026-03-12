const connectToDatabase = require("./lib/db");
const monthsModel = require("../shared/models/months");
const getCountryData = require("./lib/historical/getCountryData");

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  }

  try {
    const date = new Date();
    const month = date.getMonth() === 0 ? 12 : date.getMonth();
    const year =
      date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();

    console.log(`Starting monthly update for ${month}/${year}`);

    await connectToDatabase();

    const existing = await monthsModel.findOne({ month, year });
    if (existing) {
      console.log(`Data for ${month}/${year} already exists. Replacing it...`);
      await monthsModel.deleteOne({ _id: existing._id });
    }

    const countries = await getCountryData(month, year);

    const newMonth = new monthsModel({
      month: month,
      year: year,
      countries: countries,
    });

    await newMonth.save();
    console.log(`Successfully saved data for ${month}/${year}`);

    return res
      .status(200)
      .json({ message: `Successfully updated data for ${month}/${year}` });
  } catch (err) {
    console.error("Cron job error:", err);
    return res.status(500).json({ error: err.message });
  }
};
