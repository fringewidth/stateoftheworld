/* eslint-disable react/prop-types */
import "./GlobeRender3.css";
import Globe from "../../../Globe/Globe";

function GlobeRender3(props) {
  return (
    <>
      <Globe UVMap={props.UVMap} />
    </>
  );
}

export default GlobeRender3;
