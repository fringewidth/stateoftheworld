/* eslint-disable react/prop-types */
import GlobeRender0 from "../GlobeRender0/GlobeRender0";
import GlobeRender1 from "../GlobeRender1/GlobeRender1";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../../../Contexts/MonthData";
import { co2Context } from "../../../../Contexts/CO2";

function AllGlobes(props) {
  const monthData = useContext(MonthContext);
  const co2Data = useContext(co2Context);
  const [minMax, setMinMax] = useState({ min: null, max: null });
  const [isMonthLoading, setIsMonthLoading] = useState(true);
  const [isCO2Loading, setIsCO2Loading] = useState(true);

  useEffect(() => {
    if (monthData) {
      setMinMax({
        min: Math.min(...monthData?.map((x) => x.tempAnomaly)),
        max: Math.max(...monthData?.map((x) => x.tempAnomaly)),
      });
    }
  }, [monthData]);

  const tempData = monthData?.reduce((acc, curr) => {
    acc[curr.code] = curr.tempAnomaly;
    return acc;
  }, {});

  const sentimentData = monthData?.reduce((acc, curr) => {
    acc[curr.code] =
      curr.news.reduce((acc, curr) => {
        acc += curr.sentiment;
        return acc;
      }, 0) / curr.news.length;
    return acc;
  }, {});

  return (
    <>
      <div className=" max-[515px]:scale-75 max-[380px]:scale-[0.65]">
        {props.globe === 0 && (
          <GlobeRender0
            UVMap={props.UVMap}
            setCountryCode={props.setCountryCode}
          />
        )}
        {props.globe === 1 && (
          <GlobeRender1
            loading={{
              isLoading: isMonthLoading,
              setIsLoading: setIsMonthLoading,
            }}
            globe={props.globe}
            setCountryCode={props.setCountryCode}
            // newCountryData={props.newCountryData}
            data={tempData}
            min={minMax.min}
            max={minMax.max}
          />
        )}
        {props.globe === 2 && (
          <GlobeRender1
            loading={{
              isLoading: isCO2Loading,
              setIsLoading: setIsCO2Loading,
            }}
            globe={props.globe}
            setCountryCode={props.setCountryCode}
            data={co2Data?.countries}
            min={co2Data?.min}
            max={co2Data?.max}
          />
        )}
        {props.globe === 3 && (
          <GlobeRender1
            loading={{
              isLoading: isMonthLoading,
              setIsLoading: setIsMonthLoading,
            }}
            globe={props.globe}
            setCountryCode={props.setCountryCode}
            data={sentimentData}
            min={-1}
            max={1}
          />
        )}
      </div>
    </>
  );
}
export default AllGlobes;
