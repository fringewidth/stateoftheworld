/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as THREE from "three";
import vertexShader from "../../assets/shaders/vertex.glsl.js";
import fragmentShader from "../../assets/shaders/fragment.glsl.js";
import { useEffect, useRef, useCallback } from "react";
import atmVertexShader from "../../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../../assets/shaders/atmFragment.glsl.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Globe(props) {
  const refContainer = useRef(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const camera = useRef();
  const scene = useRef();
  const sphere = useRef();

  const onClick = useCallback(
    (event) => {
      // wrap onClick with useCallback
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera.current);

      const intersects = raycaster.intersectObjects(scene.current.children);

      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object === sphere.current) {
          const uv = intersects[i].uv;
          // console.log(uv);
          const lon = uv.x * 360 - 180;
          const lat = uv.y * 180 - 90;
          console.log("Longitude: ", lon, "Latitude:", lat);
        }
      }
    },

    [mouse, raycaster]
  );

  useEffect(() => {
    if (refContainer.current.firstChild) {
      refContainer.current.removeChild(refContainer.current.firstChild);
    }
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(650, 650);

    renderer.setPixelRatio(window.devicePixelRatio);
    refContainer.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.dampingFactor = 0.2;
    controls.update();

    window.addEventListener("click", onClick);

    sphere.current = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load(props.UVMap),
          },
        },
      })
    );

    const bigAtmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: atmVertexShader,
        fragmentShader: atmFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );

    sphere.current.rotation.x = -0.2;
    sphere.current.rotation.y = 0.175;
    camera.current.position.z = -15;
    scene.current.add(sphere.current);
    scene.current.add(bigAtmosphere);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene.current, camera.current);
      sphere.current.rotation.y += 0.0001;
      controls.update();
    }

    animate();
  }, [props.UVMap, onClick]);

  return <div ref={refContainer} />;
}
