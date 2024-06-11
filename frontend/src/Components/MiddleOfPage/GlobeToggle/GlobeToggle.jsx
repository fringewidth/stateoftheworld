/* eslint-disable react/prop-types */
import "./GlobeToggle.css";
import co2 from "../../../assets/svg/co2.svg";
import globe from "../../../assets/svg/globe.svg";
import sentiment from "../../../assets/svg/sentiment.svg";
import thermometer from "../../../assets/svg/thermometer.svg";

function GlobeToggle(props) {
  const changeGlobe = (index) => {
    props.setGlobe(index);
  };
  const toggleButtons = [
    [globe, "EARTH"],
    [thermometer, "TEMPERATURE"],
    [co2, "EMISSIONS"],
    [sentiment, "SENTIMENT"],
  ].map((button, index) => {
    return (
      <div
        key={index}
        onClick={() => changeGlobe(index)}
        className={props.globe === index ? "active" : "inactive"}
      >
        <img src={button[0]} alt={button[1]} />
        {/* Warning: validateDOMNesting(...): <caption> cannot appear as a child of <div>. */}
        <caption>{button[1]}</caption>
      </div>
    );
  });

  return (
    <div className="globetoggle">
      <h1 className="font-extrabold">TOGGLE GLOBE</h1>
      <div className="togglebar">{toggleButtons}</div>
    </div>
  );
}

export default GlobeToggle;
