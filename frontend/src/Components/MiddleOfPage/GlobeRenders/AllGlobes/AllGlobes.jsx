/* eslint-disable react/prop-types */
import GlobeRender0 from "../GlobeRender0/GlobeRender0";
import GlobeRender1 from "../GlobeRender1/GlobeRender1";
// import GlobeRender3 from "../GlobeRender3/GlobeRender3";
// import GlobeRender4 from "../GlobeRender4/GlobeRender4";

function AllGlobes(props) {
  return (
    <>
      <div className=" max-[515px]:scale-75 max-[380px]:scale-[0.65]">
        {props.globe === 0 && (
          <GlobeRender0
            UVMap={props.UVMap}
            setCountryCode={props.setCountryCode}
          />
        )}
        {props.globe == 1 && <GlobeRender1 globe={props.globe} />}
        {props.globe == 2 && <GlobeRender1 globe={props.globe} />}
        {props.globe == 3 && <GlobeRender1 globe={props.globe} />}
      </div>
    </>
  );
}
export default AllGlobes;
