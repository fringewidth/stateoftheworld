import "./GlobeToggle.css";
import co2 from "../../../assets/svg/co2.svg";
import globe from "../../../assets/svg/globe.svg";
import { useState } from "react";

function GlobeToggle(props) {
  const changeGlobe = (index) => {
    props.setGlobe(index);
  };
  return (
    <div className="globetoggle">
      <h1 className="font-extrabold">TOGGLE GLOBE</h1>
      <div className="togglebar">
        <div
          onClick={() => changeGlobe(0)}
          className={props.globe === 0 ? "active" : "inactive"}
        >
          <img src={globe} alt="" />
          <caption>EARTH</caption>
        </div>
        <div
          onClick={() => changeGlobe(1)}
          className={props.globe === 1 ? "active" : "inactive"}
        >
          <img src={co2} alt="" />
          <caption>EMISSIONS</caption>
        </div>
      </div>
    </div>
  );
}

export default GlobeToggle;
