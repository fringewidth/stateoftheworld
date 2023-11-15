import "./RightSideOfPage.css";
import Sentiment from "./Sentiment/Sentiment";
import InfoCard from "./InfoCard/InfoCard";
import CreditsCard from "./CreditsCard/CreditsCard";

function RightSideOfPage() {
  return (
    <>
      <div className="RightSideOfPageContainer">
        <Sentiment />
        <InfoCard />
        <CreditsCard />
      </div>
    </>
  );
}

export default RightSideOfPage;
