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
  const Info = props.countryData.CountryInfo;

  const countryToImage = {
    Australia,
    Brazil,
    Canada,
    China,
    Germany,
    Spain,
    France,
    UK,
    India,
    Italy,
    Japan,
    SouthKorea,
    Mexico,
    Russia,
    USA,
  };

  const imageLink = countryToImage[props.country];

  return (
    <>
      <div className="max-w-sm">
        <div className="relative">
          {props.country === "Global" ? (
            <PiGlobeStandLight size={200} />
          ) : (
            <img
              className="max-md:h-[40vh]"
              src={imageLink}
              alt={`${Info?.name} Image`}
            />
          )}
          <div className="absolute top-2/4 right-[20%]">
            <h5
              style={{ WebkitTextStroke: "1.5px black" }}
              className="mb-2 text-4xl font-bold tracking-[4px] text-gray-900 dark:text-white"
            >
              {Info?.name}
            </h5>
          </div>
        </div>

        <p className="mb-3 font-normal">
          <strong>Temperature Anomalies:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            +{Info?.TemperatureAnomalies?.toFixed(2)}°C
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Sea Level Rise:</strong> <br />
          <span className="text-orange-500 font-semibold text-2xl">
            {Info?.SeaLevelRise}mm
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Carbon Emissions:</strong> <br />
          <span className="text-orange-500 font-semibold">
            <span className="text-2xl">{Info?.CarbonEmissions}</span>million
            metric tons
          </span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Renewable Energy Production:</strong> <br />
          <span className="text-green-500 text-2xl ">
            {Info?.RenewableEnergyProduction}%
          </span>
        </p>
      </div>
    </>
  );
}

export default InfoCard;
