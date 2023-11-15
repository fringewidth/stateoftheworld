import "./MiddleOfPage.css";
import TitleAndMonth from "./TitleAndMonth/TitleAndMonth";
import GlobeRender1 from "./GlobeRenders/GlobeRender1/GlobeRender1";
import GlobeToggle from "./GlobeToggle/GlobeToggle";

function MiddleOfPage() {
  return (
    <>
      <div className="MiddleOfPageContainer">
        <TitleAndMonth />
        <GlobeRender1 />
        <GlobeToggle />
      </div>
    </>
  );
}

export default MiddleOfPage;
