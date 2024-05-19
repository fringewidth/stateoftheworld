const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const messageRoute = require("./routes/messages");

const app = express();
const port = 2000;

mongoose
  .connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
app.use(cors());
app.use("/messages", messageRoute);
