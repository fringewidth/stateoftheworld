import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import GeoJsonGeometriesLookup from "geojson-geometries-lookup";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import atmVertexShader from "../../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../../assets/shaders/atmFragment.glsl.js";

export default function Globe() {
  const [mounted, setMounted] = useState(0);
  const refDiv = useRef(null);
  useEffect(() => {
    setMounted(mounted + 1);
    console.log("mounted", mounted);
    if (refDiv.current.firstChild) {
      refDiv.current.removeChild(refDiv.current.firstChild);
      console.log("removed");
    }
    //global constants
    const SCALE = 5;
    const GLOBE_RADIUS = 1;
    const DEG2RAD = Math.PI / 180;
    const rows = 200;
    const dotDensity = 12;
    //initialise geojson lookup
    fetch("src/assets/geojson/c.geojson")
      .then((response) => response.json())
      .then((geojson) => {
        const glookup = new GeoJsonGeometriesLookup(geojson);

        //create camera
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 15;

        //create renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(650, 650);
        renderer.setPixelRatio(window.devicePixelRatio);
        refDiv.current.appendChild(renderer.domElement);

        //create scene
        const scene = new THREE.Scene();

        //define globe material
        const globeMaterial = new THREE.MeshPhysicalMaterial({});
        globeMaterial.color = new THREE.Color(0x333333);
        globeMaterial.roughness = 0.5;
        globeMaterial.metalness = 1;
        globeMaterial.clearcoat = 0.8;
        globeMaterial.clearcoatRoughness = 0.6;
        globeMaterial.reflectivity = 0.5;

        //create globe
        const globe = new THREE.Mesh(
          new THREE.SphereGeometry(GLOBE_RADIUS * SCALE, 50, 50),
          globeMaterial
        );
        scene.add(globe);

        // Define ambient light
        // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        // scene.add(ambientLight);

        // Define directional lights
        const frontLight = new THREE.DirectionalLight(0xffffff, 1);
        frontLight.position.set(50 * SCALE, 100 * SCALE, 200 * SCALE);
        scene.add(frontLight);

        // const leftLight = new THREE.DirectionalLight(0xffffff, 0.75);
        // leftLight.position.set(-25 * SCALE, -10 * SCALE, -20 * SCALE);
        // scene.add(leftLight);

        // const rightLight = new THREE.DirectionalLight(0xffffff, 0.75);
        // rightLight.position.set(25 * SCALE, -10 * SCALE, -20 * SCALE);
        // scene.add(rightLight);

        //draw dots
        //dot materials
        //normal dot material
        const dotMaterialNorm = globeMaterial.clone();
        dotMaterialNorm.color = new THREE.Color(0x9a9a9a);

        //dot material for special countries
        const dotMaterialSpec = globeMaterial.clone();
        dotMaterialSpec.color = new THREE.Color(0xffffff);
        dotMaterialSpec.emissive = new THREE.Color(0xffffff);
        dotMaterialSpec.emissiveIntensity = 0.3;

        for (let lat = -90; lat <= 90; lat += 180 / rows) {
          const radius = Math.cos(lat * DEG2RAD) * GLOBE_RADIUS * SCALE;
          const circumference = radius * 2 * Math.PI;
          const dotsPerLat = circumference * dotDensity;

          //define normal dots
          const normaldots = new THREE.InstancedMesh(
            new THREE.SphereGeometry(circumference / dotsPerLat / 4, 5, 5),
            dotMaterialNorm,
            //new THREE.MeshBasicMaterial({ color: 0xffffff }),
            dotsPerLat
          );

          //define special dots
          const specialdots = new THREE.InstancedMesh(
            new THREE.SphereGeometry(circumference / dotsPerLat / 4, 5, 5),
            dotMaterialSpec,
            //new THREE.MeshBasicMaterial({ color: 0xffffff }),
            dotsPerLat
          );

          for (let x = 0; x <= dotsPerLat; x++) {
            const lon = (x / dotsPerLat) * 360 - 180;
            //define point for geojson lookup
            const point = { type: "Point", coordinates: [lon, lat] };
            const isInCountry =
              glookup.getContainers(point).features.length > 0;
            if (!isInCountry) continue;
            const countryType =
              glookup.getContainers(point).features[0].properties.featurecla;
            // console.log(countryType);
            const dot = new THREE.Object3D();
            dot.position.set(
              Math.sin(lon * DEG2RAD) * radius,
              Math.sin(lat * DEG2RAD) * GLOBE_RADIUS * SCALE,
              Math.cos(lon * DEG2RAD) * radius
            );
            dot.updateMatrix();
            if (countryType == "Admin-0 country") {
              normaldots.setMatrixAt(x, dot.matrix);
              scene.add(normaldots);
            } else {
              specialdots.setMatrixAt(x, dot.matrix);
              scene.add(specialdots);
            }
          }
          //   scene.add(normaldots);
          //   scene.add(specialdots);
        }

        // create orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.dampingFactor = 0.2;
        controls.update();

        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
          controls.update(); // update orbit controls
          scene.rotation.y += 0.001;
        }

        animate();
      });
  }, []);

  return (
    <div
      ref={refDiv}
      //   style={{ width: "100%", height: "100%", position: "absolute" }}
    />
  );
}
