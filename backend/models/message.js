const mongoose = require("mongoose");

const messageModel = mongoose.model(
  "message",
  new mongoose.Schema({
    message: String,
  })
);

module.exports = messageModel;
