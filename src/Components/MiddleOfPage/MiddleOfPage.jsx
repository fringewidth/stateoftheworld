/* eslint-disable react/prop-types */
import "./MiddleOfPage.css";
import TitleAndMonth from "./TitleAndMonth/TitleAndMonth";
import GlobeRender1 from "./GlobeRenders/GlobeRender1/GlobeRender1";
import GlobeToggle from "./GlobeToggle/GlobeToggle";
import CountryToggleButtons from "./CountryToggleButtons";

function MiddleOfPage(props) {
  return (
    <>
      <div className="text-white order-2 max-md:order-1 w-3/5 max-md:w-[100lvw] max-md:h-[100lvh] flex items-center justify-center flex-col">
        <TitleAndMonth />
        <CountryToggleButtons setCountry={props.setCountry} />
        <GlobeRender1 />
        <GlobeToggle />
      </div>
    </>
  );
}

export default MiddleOfPage;
