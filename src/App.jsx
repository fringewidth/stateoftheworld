import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useState } from "react";
import data from "./assets/StateOfTheWorldData";

function App() {
  const [country, setCountry] = useState("Global");
  const countryData = data[country];
  const reallyLongString =
    "https://miro.medium.com/v2/resize:fit:720/format:webp/0*F9GANogspBRfY3sR.jpg";

  return (
    <>
      <div className="md:h-screen w-screen flex max-md:flex-col font-trebuchet">
        <LeftSideOfPage countryData={countryData} />
        <MiddleOfPage setCountry={setCountry} UVMap={reallyLongString} />
        <RightSideOfPage countryData={countryData} country={country} />
      </div>
    </>
  );
}

export default App;
