/* eslint-disable react/prop-types */
import "./Sentiment.css";

function Sentiment(props) {
  const newNews = props?.newCountryData?.news;
  // console.log(newNews);
  let sum = 0;
  newNews?.forEach((news) => {
    sum += news?.sentiment;
  });
  // console.log(sum);
  const OverallSentiment = (sum / newNews?.length)?.toFixed(2);
  // console.log(OverallSentiment);

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

  const BlueStyle = {
    margin: "100px",
    width: "0.001px",
    height: "0.001px",
    backgroundColor: "blue",
    borderRadius: "50%",
    boxShadow: "0 0 500px 100px blue",
  };

  return (
    <>
      <div
        className="absolute -z-10 top-0 right-0"
        style={
          OverallSentiment > 0.5
            ? PositiveGreenStyle
            : OverallSentiment < -0.5
            ? NegativeRedStyle
            : OverallSentiment >= 0 && OverallSentiment < 0.5
            ? BlueStyle
            : OrangeStyle
        }
      />
      <div className="flex flex-col text-right justify-end mt-4">
        <h1 className=" text-sm font-medium whitespace-nowrap tracking-[3px] mr-[-25px]">
          OVERALL SENTIMENT
        </h1>
        <span className="text-[45px] m-2 font-bold tracking-[3px]">
          {OverallSentiment === "NaN" ? "Loading..." : OverallSentiment}
        </span>
        <h1 className="text-2xl whitespace-nowrap font-bold tracking-[3px]">
          {OverallSentiment > 0.5
            ? "POSITIVE"
            : OverallSentiment < -0.5
            ? "NEGATIVE"
            : OverallSentiment >= 0 && OverallSentiment <= 0.5
            ? "MILDLY POSITIVE"
            : "MILDLY NEGATIVE"
            ? OverallSentiment === NaN
            : ""}
        </h1>
      </div>
    </>
  );
}

export default Sentiment;
