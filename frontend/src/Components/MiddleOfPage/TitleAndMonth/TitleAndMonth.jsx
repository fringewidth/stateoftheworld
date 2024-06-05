/* eslint-disable react/prop-types */
import "./TitleAndMonth.css";

function TitleAndMonth(props) {
  const nextMonth = () => {
    props.setDate((prevDate) => {
      let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
      // Prevent going beyond the current month
      if (newDate > props.currentUpToDate) {
        return prevDate;
      }
      props.setMonth(newDate.getMonth() + 1); // Months are 0-indexed
      props.setYear(newDate.getFullYear());
      return newDate;
    });
  };

  const prevMonth = () => {
    props.setDate((prevDate) => {
      let newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
      // Prevent going back beyond January 2024
      if (
        newDate.getFullYear() < 2024 ||
        (newDate.getFullYear() === 2024 && newDate.getMonth() < 0) // 2 = March, 3 = April and so on
      ) {
        return prevDate;
      }
      props.setMonth(newDate.getMonth() + 1); // Months are 0-indexed
      props.setYear(newDate.getFullYear());
      return newDate;
    });
  };

  return (
    <div className="max-[380px]:mb-[-100px] max-[515px]:mb-[-100px] text-center">
      <h1 className="mb-2 mt-2 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl whitespace-nowrap">
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
        {props.date.toLocaleString("en-US", { month: "long" })}{" "}
        {props.date.getFullYear()}
        &nbsp;
        <button className="text-2xl" onClick={nextMonth}>
          &gt;
        </button>
      </h2>
    </div>
  );
}

export default TitleAndMonth;
