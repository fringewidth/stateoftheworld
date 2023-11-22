import "./TitleAndMonth.css";

import { useState } from "react";

function TitleAndMonth() {
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);

  const nextMonth = () => {
    setDate((prevDate) => {
      let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
      // Prevent going beyond the current month
      if (newDate > currentDate) {
        return prevDate;
      }
      return newDate;
    });
  };

  const prevMonth = () => {
    setDate((prevDate) => {
      let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
      // Prevent going back beyond March 2023
      if (
        newDate.getFullYear() < 2023 ||
        (newDate.getFullYear() === 2023 && newDate.getMonth() < 2) // 2 = March, 3 = April and so on
      ) {
        return prevDate;
      }
      return newDate;
    });
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
        STATE OF THE&nbsp;
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          WORLD
        </span>
      </h1>
      <h2 className="text-xl font-semibold tracking-wide text-white uppercase">
        <button className="text-2xl" onClick={prevMonth}>
          &lt;
        </button>
        &nbsp;
        {date.toLocaleString("en-US", { month: "long" })} {date.getFullYear()}
        &nbsp;
        <button className="text-2xl" onClick={nextMonth}>
          &gt;
        </button>
      </h2>
    </>
  );
}

export default TitleAndMonth;
