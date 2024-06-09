import * as THREE from "three";
import atmVertexShader from "../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../assets/shaders/atmFragment.glsl.js";

// returns an atmosphere mesh with the rgba colors of the arguements
export default function BaseAtm(...rgba) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(6.5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmVertexShader,
      fragmentShader: atmFragmentShader(...rgba),
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );
}
