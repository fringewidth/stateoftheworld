/* eslint-disable react/prop-types */
import "./InfoCard.css";

function InfoCard(props) {
  const Info = props.countryData.CountryInfo;

  return (
    <>
      <div className="max-w-sm">
        <div className="">
          <img
            className="rounded-t-lg"
            src={props.CountryImage}
            alt={`${Info?.name} Image`}
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {Info?.name}
            </h5>
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
      </div>
    </>
  );
}

export default InfoCard;
