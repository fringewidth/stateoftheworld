/* eslint-disable react/prop-types */
import "./TitleAndMonth.css";
import leftArrow from "../../../assets/svg/leftarrow.svg";
import rightArrow from "../../../assets/svg/rightarrow.svg";

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

  const isAtBackwardLimit =
    props.date.getFullYear() <= 2024 && props.date.getMonth() === 0;
  const isAtForwardLimit =
    props.date.getMonth() === props.currentUpToDate.getMonth();

  return (
    <div className="max-[380px]:mb-[-100px] max-[515px]:mb-[-100px] text-center">
      <h1 className="mb-2 mt-2 text-3xl font-extrabold text-white md:text-4xl min-[810px]:text-5xl lg:text-6xl whitespace-nowrap">
        STATE OF THE&nbsp;
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          WORLD
        </span>
      </h1>
      <h2
        className="text-xl font-semibold tracking-wide text-white uppercase"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <button
          className={`hover:opacity-50 ${
            isAtBackwardLimit ? "opacity-50" : ""
          }`}
          onClick={prevMonth}
        >
          <img src={leftArrow} className="h-8" />
        </button>
        <div className="w-48 text-center text-xl">
          &nbsp;
          {props.date.toLocaleString("en-US", { month: "long" })}{" "}
          {props.date.getFullYear()}
          &nbsp;
        </div>
        <button
          className={`hover:opacity-50 ${isAtForwardLimit ? "opacity-50" : ""}`}
          onClick={nextMonth}
        >
          <img src={rightArrow} className="h-8" />
        </button>
      </h2>
    </div>
  );
}

export default TitleAndMonth;
