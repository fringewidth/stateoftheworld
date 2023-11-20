import * as THREE from "three";
import vertexShader from "../../assets/shaders/vertex.glsl.js";
import fragmentShader from "../../assets/shaders/fragment.glsl.js";
import { useEffect, useRef } from "react";
import atmVertexShader from "../../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../../assets/shaders/atmFragment.glsl.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const reallyLongString =
  "https://media.canva.com/1/image-resize/1/1400_700_92_JPG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9DMm1tUS9NQUYwdFpDMm1tUS8xL3AuanBn?osig=AAAAAAAAAAAAAAAAAAAAAKGttqUoyNPy4vmp0_T6hqSTlhlkoey9qwy4XhoAmEWQ&exp=1700502173&x-canva-quality=screen_2x&csig=AAAAAAAAAAAAAAAAAAAAACoIurdcXkVpreH374EV3YPZXzQoj1aVxAYJLT-Ae5pE";
export default function Globe() {
  const refContainer = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
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
            //value: new THREE.TextureLoader().load(Props.UVMap)
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
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.001;
      controls.update();
    }

    animate();
  }, []);
  return <div ref={refContainer} />;
}
