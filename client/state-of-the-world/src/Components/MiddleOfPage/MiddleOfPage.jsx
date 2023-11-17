import "./MiddleOfPage.css";
import TitleAndMonth from "./TitleAndMonth/TitleAndMonth";
import GlobeRender1 from "./GlobeRenders/GlobeRender1/GlobeRender1";
import GlobeToggle from "./GlobeToggle/GlobeToggle";

function MiddleOfPage() {
  return (
    <>
      <div className="text-white order-2 max-md:order-1 w-3/5 max-md:w-[100svw] flex items-center justify-center flex-col border-solid border border-white">
        <TitleAndMonth />
        <GlobeRender1 />
        <GlobeToggle />
      </div>
    </>
  );
}

export default MiddleOfPage;
