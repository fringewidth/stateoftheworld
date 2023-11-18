/* eslint-disable react/prop-types */
import "./RightSideOfPage.css";
import Sentiment from "./Sentiment/Sentiment";
import InfoCard from "./InfoCard/InfoCard";
import CreditsCard from "./CreditsCard/CreditsCard";

function RightSideOfPage(props) {
  return (
    <>
      <div className=" text-white order-3 max-md:order-2 w-1/5 max-md:w-[100svw] flex items-center justify-center flex-col border-solid border border-white">
        <Sentiment countryData={props.countryData} />
        <InfoCard countryData={props.countryData} />
        <CreditsCard />
      </div>
    </>
  );
}

export default RightSideOfPage;
