require("dotenv").config({ path: "../../.env" });

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_STRING).then(async () => {
  //delete all months
  const monthsModel = require("../../models/months");
  // await monthsModel.deleteMany({});
  const months = await monthsModel.find({});
  console.log(months.length);
});
