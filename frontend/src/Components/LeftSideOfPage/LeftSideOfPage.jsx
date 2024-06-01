/* eslint-disable react/prop-types */
import "./LeftSideOfPage.css";
import NewsFeedCard from "./NewsFeedCard/NewsFeedCard";

function LeftSideOfPage(props) {
  const newNews = props.newCountryData?.news;
  const EntireNewsFeed = newNews?.map((newNews) => (
    <NewsFeedCard
      key={newNews?._id}
      NewsSource={newNews?.headline}
      NewsTitle={newNews?.content}
      NewsLink={newNews?.link}
      SentimentStatus={newNews?.sentiment}
    />
  ));

  return (
    <>
      <div className="order-1 max-md:order-3 w-1/5 max-md:w-[100svw] h-[100svh] max-md:h-auto border-solid border border-black overflow-y-auto flex items-center flex-col ">
        <div className="max-md:flex ml-3">
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span className="flex w-2.5 h-2.5 bg-red-600 rounded-full me-1.5 flex-shrink-0"></span>
            Negative
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span className="flex w-2.5 h-2.5 bg-yellow-500 rounded-full me-1.5 flex-shrink-0"></span>
            Mildly Negative
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span className="flex w-2.5 h-2.5 bg-blue-500 rounded-full me-1.5 flex-shrink-0"></span>
            Mildly Positive
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>
            Positive
          </span>
        </div>

        {EntireNewsFeed}
      </div>
    </>
  );
}

export default LeftSideOfPage;
