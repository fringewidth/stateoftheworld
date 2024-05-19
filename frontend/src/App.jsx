import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useState } from "react";
import data from "./assets/StateOfTheWorldData";
// import WeatherData from "./assets/CountryLatnLongData";

function App() {
  const [country, setCountry] = useState("Global");
  const countryData = data[country];
  // const [Monthlyagg, setMonthlyagg] = useState([]);

  // const reallyLongString =
  //   "https://miro.medium.com/v2/resize:fit:720/format:webp/0*F9GANogspBRfY3sR.jpg";

  return (
    <>
      <div className="md:h-screen w-screen flex max-md:flex-col font-trebuchet">
        <LeftSideOfPage countryData={countryData} />
        <MiddleOfPage
          setCountry={setCountry}
          UVMap={"src/assets/textures/earth_2k.jpg"}
        />
        <RightSideOfPage countryData={countryData} country={country} />
      </div>
    </>
  );
}

export default App;
