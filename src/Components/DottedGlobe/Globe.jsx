import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import GeoJsonGeometriesLookup from "geojson-geometries-lookup";
import Camera from "../../utils/camera.js";
import Renderer from "../../utils/renderer.js";
import BaseGlobe from "../../utils/baseGlobe.js";
import orbitControls from "../../utils/orbitControls.js";
import atmVertexShader from "../../assets/shaders/atmVertex.glsl.js";
import atmFragmentShader from "../../assets/shaders/atmFragment.glsl.js";
import countriesData from "../../assets/StateOfTheWorldData.jsx";

export default function Globe(props) {
  //maps function from (0,1) to (red, blue) hexcodes
  const colorMap = (value) => {
    const r = value < 0.5 ? 1 : 1 - (value - 0.5) * 2;
    const g = value < 0.5 ? value * 2 : 1;
    const b = value > 0.5 ? 1 : value * 2;
    return new THREE.Color(r, g, b);
  };
  const statistics = [
    "",
    { title: "CarbonEmissions", min: 300, max: 1050 },
    { title: "SeaLevelRise", min: 4, max: 19 },
    { title: "TemperatureAnomalies", min: 0.6, max: 2.1 },
  ];

  //global constants
  const SCALE = 5;
  const GLOBE_RADIUS = 1;
  const DEG2RAD = Math.PI / 180;
  const rows = 200;
  const dotDensity = 12;

  const refDiv = useRef(null);

  useEffect(() => {
    //initialise geojson lookup
    fetch("src/assets/geojson/c.geojson")
      .then((response) => response.json())
      .then((geojson) => buildGlobe(geojson));
  }, [props.globe]);

  const buildGlobe = async (geojson) => {
    const glookup = new GeoJsonGeometriesLookup(geojson);

    //create camera
    const camera = Camera();

    //create renderer
    const renderer = Renderer();
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
    const globe = BaseGlobe();
    globe.material = globeMaterial;
    scene.add(globe);

    // Define ambient light
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    // Define directional lights
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(50 * SCALE, 100 * SCALE, 200 * SCALE);
    scene.add(frontLight);

    //draw dots
    //dot materials
    //normal dot material
    const dotMaterialNorm = globeMaterial.clone();
    dotMaterialNorm.color = new THREE.Color(0xffffff);

    //dot material for special countries
    const dotMaterialSpec = globeMaterial.clone();
    dotMaterialSpec.color = new THREE.Color(0xffffff);
    dotMaterialSpec.emissive = new THREE.Color(0xffffff);
    dotMaterialSpec.emissiveIntensity = 0.6;

    for (let lat = -90; lat <= 90; lat += 180 / rows) {
      const radius = Math.cos(lat * DEG2RAD) * GLOBE_RADIUS * SCALE;
      const circumference = radius * 2 * Math.PI;
      const dotsPerLat = circumference * dotDensity;

      //define normal dots
      const normaldots = new THREE.InstancedMesh(
        new THREE.SphereGeometry(circumference / dotsPerLat / 4, 2, 2),
        dotMaterialNorm,
        //new THREE.MeshBasicMaterial({ color: 0xffffff }),
        dotsPerLat
      );

      //define special dots
      const specialdots = new THREE.InstancedMesh(
        new THREE.SphereGeometry(circumference / dotsPerLat / 4, 2, 2),
        dotMaterialSpec,
        //new THREE.MeshBasicMaterial({ color: 0xffffff }),
        dotsPerLat
      );

      const countryDots = {};
      Object.entries(countriesData).forEach(([country, data]) => {
        const mat = globeMaterial.clone();
        let statistic = data["CountryInfo"][statistics[props.globe].title];
        statistic =
          (statistic - statistics[props.globe].min) /
          (statistics[props.globe].max - statistics[props.globe].min);
        statistic = colorMap(statistic);
        mat.emissive = new THREE.Color(statistic);
        countryDots[country] = new THREE.InstancedMesh(
          new THREE.SphereGeometry(circumference / dotsPerLat / 4, 2, 2),
          mat,
          dotsPerLat
        );
      });

      for (let x = 0; x <= dotsPerLat; x++) {
        const lon = (x / dotsPerLat) * 360 - 180;
        //define point for geojson lookup
        const point = { type: "Point", coordinates: [lon, lat] };
        const isInCountry = glookup.getContainers(point).features.length > 0;
        if (!isInCountry) continue;
        const properties = glookup.getContainers(point).features[0].properties;
        const countryType = properties.featurecla;
        const dot = new THREE.Object3D();
        dot.position.set(
          Math.sin(lon * DEG2RAD) * radius,
          Math.sin(lat * DEG2RAD) * GLOBE_RADIUS * SCALE,
          Math.cos(lon * DEG2RAD) * radius
        );
        const countryName = properties.abbrev;
        dot.updateMatrix();
        if (countryType == "Admin-0 country") {
          normaldots.setMatrixAt(x, dot.matrix);
          scene.add(normaldots);
        } else {
          countryDots[countryName].setMatrixAt(x, dot.matrix);
          scene.add(countryDots[countryName]);
        }
      }
    }
    const bigAtmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: atmVertexShader,
        fragmentShader: atmFragmentShader(0.65, 0.65, 0.69, 0.65),
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    scene.add(bigAtmosphere);

    // create orbit controls
    const controls = orbitControls(camera, renderer);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
      scene.rotation.y += 0.001;
    }

    animate();
  };

  return <div ref={refDiv} />;
}
