import * as THREE from 'three';

export default function Camera() {
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 15;
    return camera;
}