import "./LeftSideOfPage.css";
import NewsFeedCard from "./NewsFeedCard/NewsFeedCard";
import data from "./NewsFeedCard/NewsData";
import { useState } from "react";

function LeftSideOfPage() {
  const [News] = useState(data);

  const EntireNewsFeed = News.map((News) => (
    <NewsFeedCard
      key={News.NewsTitle}
      NewsSource={News.NewsSource}
      NewsTitle={News.NewsTitle}
      NewsLink={News.NewsLink}
      SentimentStatus={News.SentimentStatus}
      Description={News.Description}
    />
  ));

  return (
    <>
      <div className="order-1 max-md:order-3 w-1/5 max-md:w-[100svw] h-[100svh] max-md:h-auto border-solid border border-black overflow-y-auto flex items-center flex-col ">
        <h1 className=" text-xl text-white">NEWS FEED</h1>
        {EntireNewsFeed}
      </div>
    </>
  );
}

export default LeftSideOfPage;
