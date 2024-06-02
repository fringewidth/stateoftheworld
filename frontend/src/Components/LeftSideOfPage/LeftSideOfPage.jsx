/* eslint-disable react/prop-types */
import "./LeftSideOfPage.css";
import { useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);
  let scrollInterval;
  useEffect(() => {
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ top: 0.2, behaviour: "smooth" });
        }
      }, 20);
    };
    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("mouseover", stopScroll);
      scrollRef.current.addEventListener("mouseout", startScroll);
      startScroll();
      return () => {
        stopScroll();
        scrollRef.current.removeEventListener("mouseover", stopScroll);
        scrollRef.current.removeEventListener("mouseout", startScroll);
      };
    }
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="order-1 max-md:order-3 w-1/5 max-md:w-[100svw] h-[100svh] max-md:h-auto border-solid border border-black overflow-y-auto flex items-center flex-col "
      >
        <div className="idekwhatclassthisis max-md:flex sticky top-0 bg-black w-full">
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
