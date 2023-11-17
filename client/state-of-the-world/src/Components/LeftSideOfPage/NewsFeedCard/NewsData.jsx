export default [
  {
    NewsSource: "Times of India",
    NewsTitle:
      "New Delhi declaration accepts disproportionate impact of climate change on women",
    NewsLink: "https://www.youtube.com/watch?v=QwievZ1Tx-8",
    SentimentStatus: "Positive",
    Description: "Description for Times of India news",
  },
  {
    NewsSource: "Economic Times",
    NewsTitle:
      "Delhi may suffer losses of Rs 2.75 trillion by 2050 due to climate change: Draft action plan",
    NewsLink: "https://www.youtube.com/watch?v=QwievZ1Tx-8",
    SentimentStatus: "Negative",
    Description: "Description for Economic Times news",
  },
  {
    NewsSource: "Reuters",
    NewsTitle: "New Delhi plans to make rain to tackle 'hazardous' smog",
    NewsLink: "https://www.youtube.com/watch?v=QwievZ1Tx-8",
    SentimentStatus: "Neutral",
    Description: "Description for Reuters news",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    NewsSource: `Dummy Source ${i + 1}`,
    NewsTitle: `Dummy News Title ${i + 1}`,
    NewsLink: `https://www.dummylink.com/${i + 1}`,
    SentimentStatus:
      i % 3 === 0 ? "Positive" : i % 3 === 1 ? "Negative" : "Neutral",
    Description: `Description for Dummy Source ${i + 1} news`,
  })),
];
