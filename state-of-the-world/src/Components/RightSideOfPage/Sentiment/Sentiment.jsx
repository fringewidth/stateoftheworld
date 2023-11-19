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

  const PositiveGreenStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "green",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px green",
  };

  const NegativeRedStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "red",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px red",
  };

  const OrangeStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "orange",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px orange",
  };

  const BlueStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "blue",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px blue",
  };

  return (
    <div
      className="absolute top-1 right-6 flex flex-col items-center justify-center"
      style={
        OverallSentiment > 0.5
          ? PositiveGreenStyle
          : OverallSentiment < -0.5
          ? NegativeRedStyle
          : OverallSentiment >= 0 && OverallSentiment < 0.5
          ? BlueStyle
          : OrangeStyle
      }
    >
      <h1 className=" text-xs whitespace-nowrap mb-8 ml-16 tracking-[3px]">
        OVERALL SENTIMENT
      </h1>
      <span className="text-[40px] font-bold mb-8 tracking-[3px]">
        {OverallSentiment}
      </span>
      <h1 className="text-2xl whitespace-nowrap tracking-[3px]">
        {OverallSentiment > 0.5
          ? "POSITIVE"
          : OverallSentiment < -0.5
          ? "NEGATIVE"
          : OverallSentiment >= 0 && OverallSentiment <= 0.5
          ? "MILDLY POSITIVE"
          : "MILDLY NEGATIVE"}
      </h1>
    </div>
  );
}

export default Sentiment;
