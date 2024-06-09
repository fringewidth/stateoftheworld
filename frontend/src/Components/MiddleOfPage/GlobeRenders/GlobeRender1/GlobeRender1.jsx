/* eslint-disable react/prop-types */
import "./GlobeRender1.css";
import DottedGlobe from "../../../DottedGlobe/Globe";

export default function GlobeRender1(props) {
  return (
    <>
      <DottedGlobe
        globe={props.globe}
        data={props.data}
        min={props.min}
        max={props.max}
        setCountryCode={props.setCountryCode}
        loading={props.loading}
      />
    </>
  );
}
