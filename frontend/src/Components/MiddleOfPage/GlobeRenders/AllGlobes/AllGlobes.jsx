/* eslint-disable react/prop-types */
import GlobeRender0 from "../GlobeRender0/GlobeRender0";
import GlobeRender1 from "../GlobeRender1/GlobeRender1";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../../../Contexts/MonthData";
function AllGlobes(props) {
  const monthData = useContext(MonthContext);
  const [minMax, setMinMax] = useState({ min: null, max: null });

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
            globe={props.globe}
            setCountryCode={props.setCountryCode}
            newCountryData={props.newCountryData}
          />
        )}
        {props.globe === 3 && (
          <GlobeRender1
            globe={props.globe}
            setCountryCode={props.setCountryCode}
          />
        )}
      </div>
    </>
  );
}
export default AllGlobes;
