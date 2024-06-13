/* eslint-disable react/prop-types */
import "./InfoCard.css";
import global from "../../../assets/countries-white/global.png";
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
    global: global,
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
      <div className="InfoCard mt-4 max-w-sm max-h-[80svh] p-2">
        <div className="relative">
          <img
            className="max-h-[35svh] p-4 max-lg:p-0 max-md:h-[40vh]"
            src={imageLink}
            alt={`${Info?.country} Image`}
          />

          <div className="absolute top-2/4 right-[20%]">
            <h5
              style={{ WebkitTextStroke: "1.5px black" }}
              className="mb-2 text-4xl font-bold tracking-[4px] text-gray-900 dark:text-white"
            >
              {Info?.country}
            </h5>
          </div>
        </div>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            Temperature Anomalies:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {Info?.tempAnomaly
              ? "+" + Info?.tempAnomaly?.toFixed(2) + "°C"
              : "NA"}
          </span>
        </p>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            Annual CO2 Emissions:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {props?.Co2Data
              ? props?.Co2Data?.toFixed(2) + " tons per capita"
              : "NA"}
          </span>
        </p>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            CO Concentration:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {Info?.coconc ? Info.coconc.toFixed(2) + "ppm" : "NA"}
          </span>
        </p>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            NO2 Concentration:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {Info?.no2conc ? Info.no2conc.toFixed(2) + "ppm" : "NA"}
          </span>
        </p>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            O3 Concentration:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {Info?.o3conc ? Info.o3conc.toFixed(2) + "ppm" : "NA"}
          </span>
        </p>

        <p className="mb-1 font-normal">
          <strong className="max-lg:text-md max-[860px]:text-sm">
            SO2 Concentration:
          </strong>{" "}
          <br />
          <span className="text-orange-500 font-semibold text-2xl max-lg:text-xl max-[860px]:text-md">
            {Info?.so2conc ? Info.so2conc.toFixed(2) + "ppm" : "NA"}
          </span>
        </p>
      </div>
    </>
  );
}

export default InfoCard;
