require("dotenv").config({ path: "../../../.env" });

const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_STRING).then(async () => {
// const monthsModel = require("../../models/months");
// await monthsModel.deleteMany({});
// const months = await monthsModel.find({});
console.log("process.env.MONGODB_STRING", process.env.MONGODB_STRING);
// console.log(months.length);
// });
