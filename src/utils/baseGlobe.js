import * as THREE from 'three';

export default function BaseGlobe(){
    const SCALE = 5;
    const GLOBE_RADIUS = 1;
    const baseGlobe = new THREE.Mesh(new THREE.SphereGeometry(SCALE*GLOBE_RADIUS, 50, 50));
    return baseGlobe;
}