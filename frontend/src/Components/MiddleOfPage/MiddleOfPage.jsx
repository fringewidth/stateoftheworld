/* eslint-disable react/prop-types */
import "./MiddleOfPage.css";
import TitleAndMonth from "./TitleAndMonth/TitleAndMonth";
import AllGlobes from "./GlobeRenders/AllGlobes/AllGlobes";
import GlobeToggle from "./GlobeToggle/GlobeToggle";
import { useState } from "react";

function MiddleOfPage(props) {
  const [globe, setGlobe] = useState(0);
  return (
    <>
      <div className="text-white flex items-center justify-end flex-col p-2 h-auto max-md:overflow-x-hidden order-2 max-md:order-1 w-3/5 max-md:w-[100lvw] max-md:h-[100lvh] ">
        <TitleAndMonth
          currentUpToDate={props.currentUpToDate}
          setDate={props.setDate}
          date={props.date}
          setMonth={props.setMonth}
          setYear={props.setYear}
        />
        <AllGlobes
          UVMap={props.UVMap}
          setCountryCode={props.setCountryCode}
          globe={globe}
        />
        <GlobeToggle globe={globe} setGlobe={setGlobe} />
      </div>
    </>
  );
}

export default MiddleOfPage;
