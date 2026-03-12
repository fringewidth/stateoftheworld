const fs = require("fs");
const path = require("path");
const ClimateClassifier = require("../ml/classifier");

let modelInitialized = false;
const classifier = new ClimateClassifier();

function initModel() {
  try {
    const modelPath = path.join(__dirname, "../ml/climate_model.json");
    if (fs.existsSync(modelPath)) {
      const modelData = fs.readFileSync(modelPath, "utf-8");
      classifier.fromJSON(modelData);
      modelInitialized = true;
      console.log("ML Sentiment Model loaded successfully.");
    } else {
      console.warn("ML Sentiment Model not found. Falling back to 0.0 scores.");
    }
  } catch (err) {
    console.error("Error loading ML model:", err);
  }
}

async function getSentiment(headlines) {
  if (!modelInitialized) {
    initModel();
  }

  // If model is still not initialized (file missing), return 0.0
  if (!modelInitialized) {
    return headlines.map(() => 0.0);
  }

  return headlines.map((headline) => {
    return classifier.predict(headline);
  });
}

module.exports = getSentiment;
