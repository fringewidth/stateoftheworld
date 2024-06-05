import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";
import { useEffect, useState } from "react";
import data from "./assets/StateOfTheWorldData";
import { MonthContext } from "./Contexts/MonthData";
import { co2Context } from "./Contexts/CO2";

function App() {
  const [_2020co2, set2020co2] = useState(null);
  const [Data, setData] = useState(null);
  const [country] = useState("Global");
  const [countryCode, setCountryCode] = useState("global");
  const currentUpToDate = new Date();
  currentUpToDate.setMonth(currentUpToDate.getMonth() - 1);
  const [date, setDate] = useState(currentUpToDate);
  const [month, SetMonth] = useState(currentUpToDate.getMonth() + 1);
  const [year, setYear] = useState(currentUpToDate.getFullYear());
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

  useEffect(() => {
    fetch(`http://localhost:2000/co2`)
      .then((res) => res.json())
      .then((data) => {
        set2020co2(data);
      });
  }, [countryCode]);

  const countryData = data[country];
  const newCountryData = Data ? Data[countryIndexMap[countryCode]] : null;
  const Co2Data = _2020co2 ? _2020co2?.countries[countryCode] : null;

  // TODO: Add a loading Spinner/Suspense to the page

  return (
    <MonthContext.Provider value={Data}>
      <div className="md:h-screen w-screen flex max-md:flex-col font-trebuchet">
        <LeftSideOfPage
          newCountryData={newCountryData}
          countryData={countryData}
        />
        <co2Context.Provider value={_2020co2}>
          <MiddleOfPage
            UVMap={"src/assets/textures/earth_2k.jpg"}
            currentUpToDate={currentUpToDate}
            setDate={setDate}
            date={date}
            setMonth={SetMonth}
            setCountryCode={setCountryCode}
            setYear={setYear}
            newCountryData={newCountryData}
          />
          <RightSideOfPage newCountryData={newCountryData} Co2Data={Co2Data} />
        </co2Context.Provider>
      </div>
    </MonthContext.Provider>
  );
}

export default App;
