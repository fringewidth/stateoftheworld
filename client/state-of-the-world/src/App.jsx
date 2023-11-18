import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useState } from "react";
import data from "./assets/StateOfTheWorldData";

function App() {
  const [country, setCountry] = useState("Global");
  const [countryData] = useState(data[country]);
  return (
    <>
      <div className="md:h-screen flex max-md:flex-col">
        <LeftSideOfPage countryData={countryData} />
        <MiddleOfPage setCountry={setCountry} />
        <RightSideOfPage countryData={countryData} />
      </div>
    </>
  );
}

export default App;