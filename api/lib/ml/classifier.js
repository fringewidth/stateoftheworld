/**
 * Simple Naive Bayes Classifier for Climate Sentiment
 * Lightweight and optimized for serverless execution.
 */
class ClimateClassifier {
  constructor() {
    this.words = {}; // { word: { pos: count, neg: count } }
    this.posCount = 0;
    this.negCount = 0;
    this.posTotalWords = 0;
    this.negTotalWords = 0;
    this.vocabularySize = 0;
  }

  // Tokenize and clean text
  tokenize(text) {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 1);
  }

  // Train on a single document
  train(text, label) {
    const tokens = this.tokenize(text);
    if (label === 1) {
      this.posCount++;
    } else {
      this.negCount++;
    }

    tokens.forEach((token) => {
      if (!this.words[token]) {
        this.words[token] = { pos: 0, neg: 0 };
        this.vocabularySize++;
      }

      if (label === 1) {
        this.words[token].pos++;
        this.posTotalWords++;
      } else {
        this.words[token].neg++;
        this.negTotalWords++;
      }
    });
  }

  // Predict sentiment for a text (returns a score between -1 and 1)
  predict(text) {
    const tokens = this.tokenize(text);
    if (tokens.length === 0) return 0;

    // Use Log Space to avoid underflow
    let posLogProb = Math.log(
      this.posCount / (this.posCount + this.negCount) || 0.5,
    );
    let negLogProb = Math.log(
      this.negCount / (this.posCount + this.negCount) || 0.5,
    );

    tokens.forEach((token) => {
      // Laplace Smoothing
      const wordData = this.words[token] || { pos: 0, neg: 0 };

      const pWordPos =
        (wordData.pos + 1) / (this.posTotalWords + this.vocabularySize);
      const pWordNeg =
        (wordData.neg + 1) / (this.negTotalWords + this.vocabularySize);

      posLogProb += Math.log(pWordPos);
      negLogProb += Math.log(pWordNeg);
    });

    // Convert log probs back to a comparative score
    // Since we just need a -1 to 1 score for the UI:
    if (posLogProb > negLogProb) {
      // Scale based on confidence if needed, but for now simple 1/-1
      return 1.0;
    } else if (negLogProb > posLogProb) {
      return -1.0;
    }
    return 0;
  }

  // Export current state to JSON
  toJSON() {
    return JSON.stringify({
      words: this.words,
      posCount: this.posCount,
      negCount: this.negCount,
      posTotalWords: this.posTotalWords,
      negTotalWords: this.negTotalWords,
      vocabularySize: this.vocabularySize,
    });
  }

  // Load from JSON
  fromJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    this.words = data.words;
    this.posCount = data.posCount;
    this.negCount = data.negCount;
    this.posTotalWords = data.posTotalWords;
    this.negTotalWords = data.negTotalWords;
    this.vocabularySize = data.vocabularySize;
  }
}

module.exports = ClimateClassifier;
