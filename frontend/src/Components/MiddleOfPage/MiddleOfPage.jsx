/* eslint-disable react/prop-types */
import "./MiddleOfPage.css";
import TitleAndMonth from "./TitleAndMonth/TitleAndMonth";
import AllGlobes from "./GlobeRenders/AllGlobes/AllGlobes";
import GlobeToggle from "./GlobeToggle/GlobeToggle";
// import CountryToggleButtons from "./CountryToggleButtons";
import { useState } from "react";

function MiddleOfPage(props) {
  const [globe, setGlobe] = useState(0);
  return (
    <>
      <div className="text-white order-2 max-md:order-1 w-3/5 max-md:w-[100lvw] max-md:h-[100lvh] flex items-center justify-center flex-col">
        <TitleAndMonth />
        {/* <CountryToggleButtons setCountry={props.setCountry} /> */}
        <AllGlobes
          UVMap={props.UVMap}
          setCountry={props.setCountry}
          globe={globe}
        />
        <GlobeToggle globe={globe} setGlobe={setGlobe} />
      </div>
    </>
  );
}

export default MiddleOfPage;
