/* eslint-disable react/prop-types */
import "./InfoCard.css";
import { PiGlobeStandLight } from "react-icons/pi";
import Australia from "../../../assets/countries-white/au.png";
import Brazil from "../../../assets/countries-white/br.png";
import Canada from "../../../assets/countries-white/ca.png";
import China from "../../../assets/countries-white/cn.png";
import Germany from "../../../assets/countries-white/de.png";
import Spain from "../../../assets/countries-white/es.png";
import France from "../../../assets/countries-white/fr.png";
import UK from "../../../assets/countries-white/gb.png";
import India from "../../../assets/countries-white/in.png";
import Italy from "../../../assets/countries-white/it.png";
import Japan from "../../../assets/countries-white/jp.png";
import SouthKorea from "../../../assets/countries-white/kr.png";
import Mexico from "../../../assets/countries-white/mx.png";
import Russia from "../../../assets/countries-white/ru.png";
import USA from "../../../assets/countries-white/us.png";

function InfoCard(props) {
  const Info = props.newCountryData;

  const countryToImage = {
    au: Australia,
    br: Brazil,
    ca: Canada,
    cn: China,
    de: Germany,
    es: Spain,
    fr: France,
    gb: UK,
    in: India,
    it: Italy,
    jp: Japan,
    kr: SouthKorea,
    mx: Mexico,
    ru: Russia,
    us: USA,
  };

  const imageLink = countryToImage[Info?.code];

  return (
    <>
      <div className="max-w-sm">
        <div className="relative">
          {Info?.code === "global" ? (
            <PiGlobeStandLight size={200} />
          ) : (
            <img
              className="max-md:h-[40vh]"
              src={imageLink}
              alt={`${Info?.country} Image`}
            />
          )}
          <div className="absolute top-2/4 right-[20%]">
            <h5
              style={{ WebkitTextStroke: "1.5px black" }}
              className="mb-2 text-4xl font-bold tracking-[4px] text-gray-900 dark:text-white"
            >
              {Info?.country}
            </h5>
          </div>
        </div>

        <p className="mb-3 font-normal">
          <strong>Temperature Anomalies:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            +{Info?.tempAnomaly?.toFixed(2)}°C
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>CO Concentration:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            {Info?.coconc?.toFixed(2)}ppm
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>NO2 Concentration:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            {Info?.no2conc?.toFixed(2)}ppm
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>O3 Concentration:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            {Info?.o3conc?.toFixed(2)}ppm
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>SO2 Concentration:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            {Info?.so2conc?.toFixed(2)}ppm
          </span>
        </p>
      </div>
    </>
  );
}

export default InfoCard;
