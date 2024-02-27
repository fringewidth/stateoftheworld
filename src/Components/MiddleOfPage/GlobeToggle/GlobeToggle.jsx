import "./GlobeToggle.css";
import co2 from "../../../assets/svg/co2.svg";
import globe from "../../../assets/svg/globe.svg";
import sealevel from "../../../assets/svg/sealevel.svg";
import thermometer from "../../../assets/svg/thermometer.svg";
import { useState } from "react";

function GlobeToggle(props) {
  const changeGlobe = (index) => {
    props.setGlobe(index);
  };
  const toggleButtons = [
    [globe, "EARTH"],
    [co2, "EMISSIONS"],
    [sealevel, "SEA LEVEL"],
    [thermometer, "TEMPERATURE"],
  ].map((button, index) => {
    return (
      <div
        onClick={() => changeGlobe(index)}
        className={props.globe === index ? "active" : "inactive"}
      >
        <img src={button[0]} alt={button[1]} />
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
