/* eslint-disable react/prop-types */
import "./NewsFeedCard.css";

function NewsFeedCard(props) {
  const PositiveGreenCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="greencard max-w-sm p-6 bg-green-900 bg-opacity-50 rounded-lg shadow m-4">
          <h5 className="mb-2 font-times font-bold text-xl max-lg:text-lg max-md:text-2xl tracking-tight text-white">
            <span
              className="bullet"
              style={{
                color: "lightgreen",
                // fontSize: "30px",
                textShadow:
                  "0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green",
                marginRight: "5px",
              }}
            >
              •
            </span>
            {props?.NewsSource}
          </h5>
          <p className="mb-3 text-white">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const MildlyNegativeYellowCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg shadow m-4">
          <h5 className="mb-2 font-times text-xl font-medium max-lg:text-lg max-md:text-2xl tracking-tight text-white">
            <span
              style={{
                color: "lightyellow",
                fontSize: "30px",
                textShadow:
                  "0 0 10px yellow, 0 0 20px yellow, 0 0 30px yellow, 0 0 40px yellow",
                marginRight: "5px",
              }}
            >
              •
            </span>
            {props?.NewsSource}
          </h5>

          <p className="mb-3 text-white font-black">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const NegativeRedCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="redcard max-w-sm p-6 bg-red-900 bg-opacity-50 rounded-lg shadow m-4">
          <h5 className="mb-2 font-times text-xl font-bold max-lg:text-lg max-md:text-2xl tracking-tight text-white">
            <span
              style={{
                color: "coral",
                textShadow:
                  "0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red",
                marginRight: "5px",
              }}
            >
              •
            </span>
            {props?.NewsSource}
          </h5>
          <p className="mb-3 text-white">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const MildlyPositiveBlueCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg shadow m-4">
          <h5 className="mb-2 font-times text-xl font-medium max-lg:text-lg max-md:text-2xl tracking-tight text-white">
            <span
              style={{
                fontSize: "30px",
                textShadow:
                  "0 0 10px blue, 0 0 20px blue, 0 0 30px blue, 0 0 40px blue",
                marginRight: "5px",
              }}
            >
              •
            </span>
            {props?.NewsSource}
          </h5>

          <p className="mb-3 text-white font-black">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  return (
    <>
      {props.SentimentStatus > 0.5
        ? PositiveGreenCard
        : props.SentimentStatus < -0.5
        ? NegativeRedCard
        : props.SentimentStatus >= 0 && props.SentimentStatus < 0.5
        ? MildlyPositiveBlueCard
        : MildlyNegativeYellowCard}
    </>
  );
}

export default NewsFeedCard;
