/* eslint-disable react/prop-types */
import "./InfoCard.css";
import { useState } from "react";

function InfoCard(props) {
  const [Info] = useState(props.countryData.CountryInfo);
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg"
          src={props.CountryImage}
          alt="Country Image"
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {Info?.name}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoCard;
