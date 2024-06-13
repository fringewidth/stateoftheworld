/* eslint-disable react/prop-types */
import "./Sentiment.css";

function Sentiment(props) {
  const newNews = props?.newCountryData?.news;
  let sum = 0;
  newNews?.forEach((news) => {
    sum += news?.sentiment;
  });

  const OverallSentiment = (sum / newNews?.length)?.toFixed(2);

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
    boxShadow: "0 0 5000px 100px orange",
  };

  const LightGreenStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "lightgreen",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px lightgreen",
  };

  return (
    <>
      <div
        className="absolute -z-10 top-4 right-4 max-md:absolute max-md:top-0 max-md:right-[35%]"
        style={
          OverallSentiment > 0.5
            ? PositiveGreenStyle
            : OverallSentiment < -0.5
            ? NegativeRedStyle
            : OverallSentiment >= 0 && OverallSentiment < 0.5
            ? LightGreenStyle
            : OrangeStyle
        }
      />
      <div className="absolute top-0 right-7 max-md:absolute max-md:top-0 max-md:right-[35%] flex flex-col justify-end items-center mt-4 mb-36">
        <h1 className="max-lg:text-xs text-sm font-medium whitespace-nowrap tracking-[3px] mr-[-25px]">
          OVERALL SENTIMENT
        </h1>
        <span className="max-lg:text-[30px] text-[45px] m-2 font-bold tracking-[3px]">
          {OverallSentiment === "NaN" ? "Loading..." : OverallSentiment}
        </span>
        <h1 className="max-lg:text-lg text-xl whitespace-nowrap font-bold tracking-[3px]">
          {OverallSentiment === "NaN"
            ? ""
            : OverallSentiment === "0.00"
            ? "NEUTRAL"
            : OverallSentiment > 0.5
            ? "POSITIVE"
            : OverallSentiment < -0.5
            ? "NEGATIVE"
            : OverallSentiment >= 0 && OverallSentiment <= 0.5
            ? "MILDLY POSITIVE"
            : "MILDLY NEGATIVE"}
        </h1>
      </div>
    </>
  );
}

export default Sentiment;
