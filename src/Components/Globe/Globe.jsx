import * as THREE from "three";
import vertexShader from "../../assets/shaders/vertex.glsl.js";
import fragmentShader from "../../assets/shaders/fragment.glsl.js";
import { useEffect, useRef } from "react";
import atmVertexShader from "../../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../../assets/shaders/atmFragment.glsl.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const reallyLongString =
  "https://miro.medium.com/v2/resize:fit:720/format:webp/0*F9GANogspBRfY3sR.jpg";

export default function Globe() {
  console.log("Component rendered");
  const refContainer = useRef(null);

  useEffect(() => {
    console.log("useEffect is running");

    if (refContainer.current.firstChild) {
      refContainer.current.removeChild(refContainer.current.firstChild);
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Set the size of the renderer
    renderer.setSize(500, 500);

    renderer.setPixelRatio(window.devicePixelRatio);
    refContainer.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.dampingFactor = 0.2;
    controls.update();

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load(reallyLongString),
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

    sphere.rotation.x = -0.2;
    sphere.rotation.y = 0.175;
    camera.position.z = -15;
    scene.add(sphere);
    scene.add(bigAtmosphere);

    function animate() {
      console.log("Animating");
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.001;
      controls.update();
    }

    animate();
  }, []);

  return <div ref={refContainer} />;
}
