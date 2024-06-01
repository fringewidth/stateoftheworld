import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useEffect, useState } from "react";
import data from "./assets/StateOfTheWorldData";

function App() {
  const [Data, setData] = useState(null);
  const [country] = useState("Global");
  const [countryCode, setCountryCode] = useState("global");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [countryIndexMap, setCountryIndexMap] = useState({});

  useEffect(() => {
    fetch(`http://localhost:2000/months/${month}/${year}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0].countries);

        const map = data[0].countries.reduce((acc, curr, index) => {
          acc[curr.code] = index;
          return acc;
        }, {});
        setCountryIndexMap(map);
      });
  }, [month, year]);

  const countryData = data[country];
  const newCountryData = Data ? Data[countryIndexMap[countryCode]] : null;

  // TODO: Add a loading Spinner/Suspense to the page

  return (
    <>
      <div className="md:h-screen w-screen flex max-md:flex-col font-trebuchet">
        <LeftSideOfPage
          newCountryData={newCountryData}
          countryData={countryData}
        />
        <MiddleOfPage
          UVMap={"src/assets/textures/earth_2k.jpg"}
          setMonth={setMonth}
          setCountryCode={setCountryCode}
          setYear={setYear}
        />
        <RightSideOfPage newCountryData={newCountryData} />
      </div>
    </>
  );
}

export default App;
