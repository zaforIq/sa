"use client";
import React, { useContext, useState } from "react";
import { TrendingContext } from "../context/TrendingContext";

const tabOptions = ["Posts", "Keywords", "Hashtags"];

export default function TrendingSection({
  selectedSources = [],
  selectedSentiment = "All",
  selectedDate = "",
}) {
  const { trending } = useContext(TrendingContext);
  const [activeTab, setActiveTab] = useState(tabOptions[0]);
  const [timeFilter, setTimeFilter] = useState("all");

  // Helper to parse date and time
  function getDateTime(post) {
    return new Date(post.publish_date + "T" + (post.publish_time || "00:00"));
  }

  // Filter by sources, sentiment, date, and time
  let filteredTrending = trending.filter((post) => {
    const showAllSources =
      selectedSources.length === 0 || selectedSources.includes("All");
    const sourceMatch =
      showAllSources || selectedSources.includes(post.platform_name);
    const sentimentMatch =
      selectedSentiment === "All" || post.sentiment === selectedSentiment;
    const dateMatch = !selectedDate || post.publish_date === selectedDate;
    return sourceMatch && sentimentMatch && dateMatch;
  });

  // Then filter by time
  if (timeFilter !== "all") {
    const now = new Date();
    let filterType = null;
    let value = 0;
    if (timeFilter.endsWith("h")) {
      filterType = "hour";
      value = parseInt(timeFilter);
    } else if (timeFilter.endsWith("d")) {
      filterType = "day";
      value = parseInt(timeFilter);
    }
    filteredTrending = filteredTrending.filter((post) => {
      const postDate = getDateTime(post);
      const diffMs = now - postDate;
      if (filterType === "hour") {
        return diffMs / (1000 * 60 * 60) <= value;
      } else if (filterType === "day") {
        return diffMs / (1000 * 60 * 60 * 24) <= value;
      }
      return true;
    });
  }

  const posts = filteredTrending;
  const keywords = Array.from(
    new Set(filteredTrending.map((item) => item.keyword))
  ).filter(Boolean);
  const hashtags = Array.from(
    new Set(filteredTrending.map((item) => item.hashtag))
  ).filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 mb-8 w-full">
      <h2 className="text-lg font-bold mb-4 text-indigo-200">Trending</h2>
      {/* Time Filter */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm font-medium text-gray-200">Show:</label>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-2 py-1 rounded border border-gray-700 bg-gray-800 text-gray-100"
        >
          <option value="all">All</option>
          <option value="1h">Last 1 hour</option>
          <option value="2h">Last 2 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="10d">Last 10 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>
      {/* Content Tabs */}
      <div className="flex gap-2 mb-4">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors duration-150 ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-indigo-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content - Scrollable */}
      <div className="mt-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
        {activeTab === "Posts" && (
          <div className="flex flex-col gap-4">
            {posts.length === 0 && (
              <span className="text-gray-500">No posts found.</span>
            )}
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200 font-semibold">
                    {post.platform_name}
                  </span>
                  <span className="text-xs px-2 py-1 rounded font-semibold bg-indigo-700 text-white">
                    {post.sentiment}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {post.publish_date}
                    {post.publish_time && (
                      <span className="ml-2 text-gray-500">
                        {post.publish_time}
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-base text-gray-100">{post.title}</div>
                <div className="text-sm text-gray-300">{post.description}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Keywords" && (
          <div className="flex flex-wrap gap-2">
            {keywords.length === 0 && (
              <span className="text-gray-500">No keywords found.</span>
            )}
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 rounded-full bg-indigo-700 text-white text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        {activeTab === "Hashtags" && (
          <div className="flex flex-wrap gap-2">
            {hashtags.length === 0 && (
              <span className="text-gray-500">No hashtags found.</span>
            )}
            {hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="px-3 py-1 rounded-full bg-indigo-700 text-white text-sm font-medium"
              >
                {hashtag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
