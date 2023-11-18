/* eslint-disable react/prop-types */
import "./Sentiment.css";

function Sentiment(props) {
  let sum = 0;
  props.countryData.CountryNews.forEach((news) => {
    sum += news.SentimentStatus;
  });
  const OverallSentiment = (sum / props.countryData.CountryNews.length).toFixed(
    2
  );

  return (
    <div
      className="absolute top-1 right-6 flex flex-col items-center justify-center"
      style={{
        margin: "100px",
        width: "0.001px",
        height: "0.001px",
        backgroundColor: "orange",
        borderRadius: "50%",
        boxShadow: "0 0 500px 100px orange", // Increased spread radius
      }}
    >
      <h1 className=" text-xs whitespace-nowrap mb-8 ml-16 tracking-[3px]">
        OVERALL SENTIMENT
      </h1>
      <span className="text-[40px] font-bold mb-8 tracking-[3px]">
        {OverallSentiment}
      </span>
      <h1 className="text-2xl whitespace-nowrap tracking-[3px]">
        MILDLY NEGATIVE
      </h1>
    </div>
  );
}

export default Sentiment;
