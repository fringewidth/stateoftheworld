/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as THREE from "three";
import vertexShader from "../../assets/shaders/vertex.glsl.js";
import fragmentShader from "../../assets/shaders/fragment.glsl.js";
import { useEffect, useRef } from "react";
import BaseAtm from "../../utils/baseAtm.js";
// import GeoJsonGeometriesLookup from "geojson-geometries-lookup";
import Camera from "../../utils/camera.js";
import Renderer from "../../utils/renderer.js";
import BaseGlobe from "../../utils/baseGlobe.js";
import orbitControls from "../../utils/orbitControls.js";

// const countryNameToCode = {
//   India: "in",
//   France: "fr",
//   Canada: "ca",
//   Spain: "es",
//   Japan: "jp",
//   Italy: "it",
//   China: "cn",
//   Mexico: "mx",
//   Australia: "au",
//   Russia: "ru",
//   Brazil: "br",
//   Germany: "de",
//   "United Kingdom": "gb",
//   "United States": "us",
//   "South Korea": "kr",
//   Global: "global",
// };

export default function Globe(props) {
  const refContainer = useRef(null);
  // const raycaster = new THREE.Raycaster();
  // const mouse = new THREE.Vector2();

  const camera = useRef();
  const scene = useRef();
  const sphere = useRef();

  //handle clicks to globe
  // const onClick = useCallback(
  //   (event) => {
  //     // normalise mouse coordinates
  //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //     raycaster.setFromCamera(mouse, camera.current);

  //     const intersects = raycaster.intersectObjects(scene.current.children);

  //     for (let i = 0; i < intersects.length; i++) {
  //       if (intersects[i].object === sphere.current) {
  //         const uv = intersects[i].uv;
  //         // console.log(uv);
  //         //calculate longitude and latitude with regression calibrated values
  //         // const lat = 180.21295 * uv.y - 85.11953;
  //         // const lon = 350.26059 * uv.x - 171.95619;
  //         const lat = 0.9411 * (180 * uv.y - 90) + 8.65778;
  //         const lon = 360 * uv.x - 180;
  //         fetch("src/assets/geojson/c.geojson")
  //           .then((response) => response.json())
  //           .then((geojson) => {
  //             const glookup = new GeoJsonGeometriesLookup(geojson);
  //             const click = { type: "Point", coordinates: [lon, lat] };
  //             const whereYouClicked = glookup.getContainers(click).features;
  //             if (whereYouClicked.length > 0) {
  //               const countryName = whereYouClicked[0].properties.name;
  //               const countryCode = countryNameToCode[countryName];
  //               if (countryCode) {
  //                 props.setCountryCode(countryCode);
  //               } else {
  //                 props.setCountryCode("global");
  //               }
  //             } else {
  //               props.setCountryCode("global");
  //             }
  //           });
  //       }
  //     }
  //   },

  //   // [mouse, raycaster] wrong dependency array
  //   [camera, scene, sphere, props.setCountry]
  // );

  useEffect(() => {
    // if (refContainer.current.firstChild) {
    //   refContainer.current.removeChild(refContainer.current.firstChild);
    // }
    scene.current = new THREE.Scene();
    camera.current = Camera();
    const renderer = Renderer();
    refContainer.current.appendChild(renderer.domElement);
    const controls = orbitControls(camera.current, renderer);

    // window.addEventListener("click", onClick);

    sphere.current = BaseGlobe();
    sphere.current.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(props.UVMap),
        },
      },
    });

    // const bigAtmosphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(6.5, 50, 50),
    //   new THREE.ShaderMaterial({
    //     vertexShader: atmVertexShader,
    //     fragmentShader: atmFragmentShader(0.1, 0.6, 1.0, 1.0),
    //     blending: THREE.AdditiveBlending,
    //     side: THREE.BackSide,
    //   })
    // );

    const bigAtmosphere = BaseAtm(0.1, 0.6, 1.0, 1.0);

    sphere.current.rotation.x = 0.2;
    sphere.current.rotation.y = -3.0125;
    scene.current.add(sphere.current);
    scene.current.add(bigAtmosphere);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene.current, camera.current);
      sphere.current.rotation.y += 0.001;
      controls.update();
    }

    animate();
  }, []);

  return <div ref={refContainer} />;
}
