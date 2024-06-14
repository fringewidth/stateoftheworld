/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

import GeoJsonGeometriesLookup from "geojson-geometries-lookup";

import Camera from "../../utils/camera.js";
import Renderer from "../../utils/renderer.js";
import BaseGlobe from "../../utils/baseGlobe.js";
import BaseAtm from "../../utils/baseAtm.js";
import orbitControls from "../../utils/orbitControls.js";
import colorMap from "../../utils/colorMap.js";

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
const ROWS = 180;
const DOT_DENSITY = 12;
const TOOLTIP_TRANSITION_SEC = 0.2;
const GLOBE_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x030303),
  roughness: 0.5,
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

function normaliseData(data, min, max) {
  return data && (data - min) / (max - min);
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

function getColor(data, globe) {
  let r, g, b;
  switch (globe) {
    case 1:
    case 2:
      [r, g, b] = colorMap(data !== null ? 1 - data : null);
      break;
    case 3:
      [r, g, b] = colorMap(data);
      break;
    default:
      [r, g, b] = colorMap(0.5);
      break;
  }

  return [r, g, b];
}

function recalcMaterials(countryDots, data, globe) {
  Object.entries(countryDots).forEach(([country, mesh]) => {
    const [r, g, b] = getColor(data[country], globe);
    mesh.material.color = new THREE.Color(r, g, b);
  });
}

export default function Globe(props) {
  const globeRef = useRef(null);

  const { isLoading, setIsLoading } = props.loading;
  const [countryDots, setCountryDots] = useState({});

  useEffect(() => {
    const countryMeshCount = Object.keys(countryDots).length;
    if (countryMeshCount === 0) return;

    const normalisedData = Object.fromEntries(
      Object.entries(props.data).map(([country, data]) => {
        const normData = normaliseData(data, props.min, props.max);
        return [country, normData];
      })
    );

    recalcMaterials(countryDots, normalisedData, props.globe);
  }, [props.data]);

  useEffect(() => {
    fetch("./c.geojson")
      .then((response) => response.json())
      .then((geojson) => {
        setIsLoading(false);
        buildGlobe(geojson);
      });

    return () => {
      const tooltip = document.querySelector(".tooltip");
      tooltip && document.body.removeChild(tooltip);
      setIsLoading(true);
    };
  }, []);

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

    const commonDots = new THREE.InstancedMesh(
      new THREE.SphereGeometry((1 / DOT_DENSITY) * 0.25, 2, 2),
      COMMON_DOT_MAT,
      8192
    );

    Object.entries(props.data).forEach(([country, data]) => {
      const mat = GLOBE_MATERIAL.clone();
      const normData = normaliseData(data, props.min, props.max);
      const [r, g, b] = getColor(normData, props.globe);
      mat.color = new THREE.Color(r, g, b);
      mat.roughness = 0.2;
      countryDots[country] = new THREE.InstancedMesh(
        new THREE.SphereGeometry((1 / DOT_DENSITY) * 1.1, 4, 4),
        mat,
        4096
      );
      countryDots[country].country = country;
    });

    const countryDotsCounts = Object.keys(countryDots).reduce(
      (acc, country) => {
        acc[country] = 0;
        return acc;
      },
      {}
    );

    let commonDotsCount = 0;

    for (let lat = -90; lat <= 90; lat += 180 / ROWS) {
      const radius = Math.cos(lat * DEG2RAD) * GLOBE_RADIUS * SCALE;
      const circumference = radius * 2 * Math.PI;
      const dotsPerLat = circumference * DOT_DENSITY;

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
          commonDots.setMatrixAt(commonDotsCount, dot.matrix);
          commonDotsCount++;
        } else {
          const countryCount = countryDotsCounts[countryName];
          countryDots[countryName]?.setMatrixAt(countryCount, dot.matrix);
          countryDotsCounts[countryName]++;
        }
      }
    }

    scene.add(commonDots);
    Object.values(countryDots).forEach((country) => scene.add(country));

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
      requestAnimationFrame(() => {
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
      });
    };
    let selectedCountry;

    const onClick = (event) => {
      if (isDragging) return;

      const mouse = getMouseCoords(event, boundingRect);
      const intersects = getIntersects(raycaster, mouse, camera, scene);

      if (intersects.length < 2) {
        props.setCountryCode("global");
        if (selectedCountry)
          selectedCountry.material.emissive = new THREE.Color(0x000000);
        selectedCountry = null;
      } else if (intersects[1].object instanceof THREE.InstancedMesh) {
        props.setCountryCode(intersects[1].object.country);
        if (selectedCountry)
          selectedCountry.material.emissive = new THREE.Color(0x000000);
        intersects[1].object.material.emissive =
          intersects[1].object.material.color;
        selectedCountry = intersects[1].object;
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
