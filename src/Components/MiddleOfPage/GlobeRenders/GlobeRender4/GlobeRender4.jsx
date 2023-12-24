/* eslint-disable react/prop-types */
import "./GlobeRender4.css";
import Globe from "../../../Globe/Globe";

function GlobeRender4(props) {
  return (
    <>
      <Globe UVMap={props.UVMap} setCountry={props.setCountry} />
    </>
  );
}

export default GlobeRender4;
