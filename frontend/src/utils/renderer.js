import * as THREE from 'three'

export default function Renderer(){
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setSize(650, 650);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}