const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const monthsRoute = require("./routes/monthsRoute");
const co2Route = require("./routes/co2Route");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 5000);

mongoose
  .connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
app.use(cors());
app.use("/months", monthsRoute);
app.use("/co2", co2Route);