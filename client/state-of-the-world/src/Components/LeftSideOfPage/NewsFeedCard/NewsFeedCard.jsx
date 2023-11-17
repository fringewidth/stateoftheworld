/* eslint-disable react/prop-types */
import "./NewsFeedCard.css";

function NewsFeedCard(props) {
  const SentimentStatusColor =
    props.SentimentStatus === "Positive"
      ? "blue"
      : props.SentimentStatus === "Negative"
      ? "red"
      : "yellow";

  return (
    <>
      <div className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow m-4">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {props.NewsTitle}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-400">{props.Description}</p>
        <a
          href={props.NewsLink}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
        >
          Read more from {props.NewsSource}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default NewsFeedCard;
