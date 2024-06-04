/* eslint-disable react/prop-types */
import "./GlobeRender1.css";
// import Globe from "../../../Globe/Globe";s
import DottedGlobe from "../../../DottedGlobe/Globe";

export default function GlobeRender1(props) {
  return (
    <>
      {/* <Globe UVMap={props.UVMap} setCountry={props.setCountry} /> */}
      <DottedGlobe
        globe={props.globe}
        data={props.data}
        min={props.min}
        max={props.max}
        setCountryCode={props.setCountryCode}
      />
    </>
  );
}
