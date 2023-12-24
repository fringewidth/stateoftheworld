/* eslint-disable react/prop-types */
import "./GlobeRender2.css";
import Globe from "../../../Globe/Globe";

function GlobeRender2(props) {
  return (
    <>
      <Globe UVMap={props.UVMap} setCountry={props.setCountry} />
    </>
  );
}

export default GlobeRender2;
