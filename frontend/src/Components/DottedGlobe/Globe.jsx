/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

import GeoJsonGeometriesLookup from "geojson-geometries-lookup";

import Camera from "../../utils/camera.js";
import Renderer from "../../utils/renderer.js";
import BaseGlobe from "../../utils/baseGlobe.js";
import BaseAtm from "../../utils/baseAtm.js";
import colorMap from "../../utils/colorMap.js";
import orbitControls from "../../utils/orbitControls.js";

import globeLoading from "../../assets/images/globe-loading-text.gif";

const countryCodeToName = {
  in: "India",
  fr: "France",
  ca: "Canada",
  es: "Spain",
  jp: "Japan",
  it: "Italy",
  cn: "China",
  mx: "Mexico",
  au: "Australia",
  ru: "Russia",
  br: "Brazil",
  de: "Germany",
  gb: "UK",
  us: "USA",
  kr: "SouthKorea",
  global: "Global",
};

const SCALE = 5;
const GLOBE_RADIUS = 1;
const DEG2RAD = Math.PI / 180;
const ROWS = 200;
const DOT_DENSITY = 12;
const TOOLTIP_TRANSITION_SEC = 0.2;
const GLOBE_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x333333),
  roughness: 0.4,
  metalness: 1,
  clearcoat: 0.8,
  clearcoatRoughness: 0.6,
  reflectivity: 0.5,
});
const COMMON_DOT_MAT = GLOBE_MATERIAL.clone();
COMMON_DOT_MAT.color = new THREE.Color(0xffffff);

function getLights() {
  const frontLight = new THREE.DirectionalLight(0xffffff, 1);
  frontLight.position.set(50 * SCALE, 100 * SCALE, 200 * SCALE);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
  backLight.position.set(-50 * SCALE, -100 * SCALE, -200 * SCALE);

  return { frontLight, backLight };
}

function getMouseCoords(event, rect) {
  return new THREE.Vector2(
    (event.offsetX / rect.width) * 2 - 1,
    -(event.offsetY / rect.height) * 2 + 1
  );
}

function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.style.opacity = 0;
  document.body.appendChild(tooltip);
  return tooltip;
}

function getIntersects(raycaster, mouse, camera, scene) {
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(scene.children);
}

export default function Globe(props) {
  const globeRef = useRef(null);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch("src/assets/geojson/c.geojson")
      .then((response) => response.json())
      .then((geojson) => {
        setisLoading(false);
        buildGlobe(geojson);
      });
  }, []);

  const statistics = [
    "",
    { title: "CarbonEmissions", min: 300, max: 1050 },
    { title: "TemperatureAnomalies", min: 0.6, max: 2.1 },
  ];

  const buildGlobe = async (geojson) => {
    const camera = Camera();
    const scene = new THREE.Scene();
    const globe = BaseGlobe(GLOBE_RADIUS, SCALE);
    globe.material = GLOBE_MATERIAL;
    scene.add(globe);

    const renderer = Renderer();
    globeRef.current?.appendChild(renderer.domElement);
    const boundingRect = globeRef.current?.getBoundingClientRect();

    const { frontLight, backLight } = getLights();

    scene.add(frontLight);
    scene.add(backLight);

    const raycaster = new THREE.Raycaster();
    raycaster.far = camera.position.z;

    const countryDots = {};
    const commonDots = [];
    for (let lat = -90; lat <= 90; lat += 180 / ROWS) {
      const radius = Math.cos(lat * DEG2RAD) * GLOBE_RADIUS * SCALE;
      const circumference = radius * 2 * Math.PI;
      const dotsPerLat = circumference * DOT_DENSITY;

      commonDots[lat] = new THREE.InstancedMesh(
        new THREE.SphereGeometry((circumference / dotsPerLat) * 0.25, 2, 2),
        COMMON_DOT_MAT,
        dotsPerLat
      );
      Object.entries(props.data).forEach(([country, data]) => {
        const mat = GLOBE_MATERIAL.clone();
        const normData = data && (data - props.min) / (props.max - props.min);
        let r, g, b;
        switch (props.globe) {
          case 1:
          case 2:
            [r, g, b] = colorMap(normData !== null ? 1 - normData : null);
            break;
          case 3:
            [r, g, b] = colorMap(normData);
            break;
          default:
            [r, g, b] = colorMap(0.5);
            break;
        }
        mat.color = new THREE.Color(r, g, b);
        mat.roughness = 0.2;
        countryDots[country] = new THREE.InstancedMesh(
          new THREE.SphereGeometry((circumference / dotsPerLat) * 1.1, 4, 4),
          mat,
          dotsPerLat
        );
        countryDots[country].country = country;
      });

      const glookup = new GeoJsonGeometriesLookup(geojson);
      for (let x = 0; x <= dotsPerLat; x++) {
        const lon = (x / dotsPerLat) * 360 - 180;
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
        const countryName = properties.iso_a2.toLowerCase();
        dot.updateMatrix();
        if (countryType == "Admin-0 country") {
          commonDots[lat].setMatrixAt(x, dot.matrix);
          scene.add(commonDots[lat]);
        } else {
          countryDots[countryName]?.setMatrixAt(x, dot.matrix);
          scene.add(countryDots[countryName]);
        }
      }
    }

    const bigAtmosphere = BaseAtm(0.65, 0.65, 0.69, 0.65);
    scene.add(bigAtmosphere);

    const controls = orbitControls(camera, renderer);

    let isDragging = false;

    const onMouseDown = () => {
      isDragging = false;
    };

    const tooltip = createTooltip();
    const onMouseMove = (event) => {
      isDragging = true;
      const mouse = getMouseCoords(event, boundingRect);
      const intersects = getIntersects(raycaster, mouse, camera, scene);

      if (
        intersects.length > 1 &&
        intersects[1]?.object instanceof THREE.InstancedMesh
      ) {
        Object.assign(tooltip.style, {
          opacity: 1.0,
          transition: `opacity ${TOOLTIP_TRANSITION_SEC}s`,
          left: `${event.clientX - 60}px`,
          top: `${event.clientY + 30}px`,
        });

        tooltip.textContent = countryCodeToName[intersects[1].object.country];
      } else {
        tooltip.style.opacity = 0;
        setTimeout(() => {
          tooltip.textContent = "";
        }, TOOLTIP_TRANSITION_SEC * 1000);
      }
    };
    const onClick = (event) => {
      if (isDragging) return;

      const mouse = getMouseCoords(event, boundingRect);
      const intersects = getIntersects(raycaster, mouse, camera, scene);

      if (intersects.length < 2) {
        props.setCountryCode("global");
      } else if (intersects[1].object instanceof THREE.InstancedMesh) {
        props.setCountryCode(intersects[1].object.country);
      }
    };

    globeRef.current.addEventListener("click", onClick);
    globeRef.current.addEventListener("mousemove", onMouseMove);
    globeRef.current.addEventListener("mousedown", onMouseDown);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
      scene.rotation.y += 0.001;
    }
    animate();
  };

  return (
    <>
      {isLoading && (
        <>
          <img
            src={globeLoading}
            style={{
              width: "320px",
              marginTop: "165px",
              marginBottom: "165px",
            }}
          />
        </>
      )}
      <div ref={globeRef} />
    </>
  );
}
