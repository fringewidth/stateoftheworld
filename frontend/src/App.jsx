import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useEffect, useState } from "react";
import data from "./assets/StateOfTheWorldData";
// import WeatherData from "./assets/CountryLatnLongData";

function App() {
  const [country, setCountry] = useState("Global");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  const countryData = data[country];
  // const [Monthlyagg, setMonthlyagg] = useState([]);

  // const reallyLongString =
  //   "https://miro.medium.com/v2/resize:fit:720/format:webp/0*F9GANogspBRfY3sR.jpg";

  return (
    <>
      <div className="md:h-screen w-screen flex max-md:flex-col font-trebuchet">
        <div>
          <h1 className="text-4xl text-center font-bold text-blue-800">
            {message}
          </h1>
        </div>
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
