/* eslint-disable react/prop-types */
import "./NewsFeedCard.css";

function NewsFeedCard(props) {
  const PositiveGreenCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-gray-900 border border-green-700 rounded-lg shadow m-4">
          <h5 className="mb-2 text-2xl max-lg:text-lg max-md:text-2xl font-mono tracking-tight text-green-300">
            {props?.NewsSource}
          </h5>

          <p className="mb-3 font-mono text-gray-300">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const MildlyNegativeYellowCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-gray-900 border border-yellow-700 rounded-lg shadow m-4">
          <h5 className="mb-2 text-2xl max-lg:text-lg max-md:text-2xl font-mono tracking-tight text-yellow-300">
            {props?.NewsSource}
          </h5>

          <p className="mb-3 font-mono text-gray-300">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const NegativeRedCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-gray-900 border border-red-700 rounded-lg shadow m-4">
          <h5 className="mb-2 text-2xl max-lg:text-lg max-md:text-2xl font-mono tracking-tight text-red-300">
            {props?.NewsSource}
          </h5>

          <p className="mb-3 font-mono text-gray-300">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  const MildlyPositiveBlueCard = (
    <>
      <a href={props?.NewsLink}>
        <div className="max-w-sm p-6 bg-gray-900 border border-blue-700 rounded-lg shadow m-4">
          <h5 className="mb-2 text-2xl max-lg:text-lg max-md:text-2xl font-mono tracking-tight text-blue-300">
            {props?.NewsSource}
          </h5>

          <p className="mb-3 font-mono text-gray-300">{props?.NewsTitle}</p>
        </div>
      </a>
    </>
  );

  return (
    <>
      {props.SentimentStatus > 0.5
        ? PositiveGreenCard
        : props.SentimentStatus > 0
        ? MildlyPositiveBlueCard
        : props.SentimentStatus > -0.5
        ? MildlyNegativeYellowCard
        : NegativeRedCard}
    </>
  );
}

export default NewsFeedCard;
