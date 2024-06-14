/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as THREE from "three";

import vertexShader from "../../assets/shaders/vertex.glsl.js";
import fragmentShader from "../../assets/shaders/fragment.glsl.js";

import BaseGlobe from "../../utils/baseGlobe.js";
import BaseAtm from "../../utils/baseAtm.js";
import Camera from "../../utils/camera.js";
import Renderer from "../../utils/renderer.js";
import orbitControls from "../../utils/orbitControls.js";

// import UVMap from "../../assets/textures/earth_1k.jpg";

export default function Globe(props) {
  const globeRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = Camera();
    const renderer = Renderer();
    globeRef.current.appendChild(renderer.domElement);
    const controls = orbitControls(camera, renderer);
    const sphere = BaseGlobe();
    sphere.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(props.UVMap),
        },
      },
    });

    globeRef.current.addEventListener("click", () => {
      props.setCountryCode("global");
    });

    const bigAtmosphere = BaseAtm(0.1, 0.6, 1.0, 1.0);

    sphere.rotation.y = -1.5;
    scene.add(sphere);
    scene.add(bigAtmosphere);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.001;
      controls.update();
    }

    animate();
  }, []);

  return <div ref={globeRef} />;
}
