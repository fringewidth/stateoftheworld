const mongoose = require("mongoose");

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.MONGODB_STRING) {
    throw new Error("Please define the MONGODB_STRING environment variable");
  }

  const db = await mongoose.connect(process.env.MONGODB_STRING);

  cachedDb = db;
  return db;
}

module.exports = connectToDatabase;
