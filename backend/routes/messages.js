const express = require("express");

const router = express.Router();

const message = require("../models/message");

router.get("/", async (req, res) => {
  try {
    const message1 = await message.findOne();
    res.json(message1);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
