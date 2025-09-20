"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";

export default function TagsPanel({
  selectedSources = [],
  selectedSentiment = "All",
  selectedDate = "",
}) {
  const { posts } = useContext(SentimentContext);
  // Filter posts according to filter state
  const filtered = posts.filter((post) => {
    const showAllSources =
      selectedSources.length === 0 || selectedSources.includes("All");
    const sourceMatch =
      showAllSources || selectedSources.includes(post.platform_name);
    const sentimentMatch =
      selectedSentiment === "All" || post.sentiment === selectedSentiment;
    const dateMatch = !selectedDate || post.publish_date === selectedDate;
    return sourceMatch && sentimentMatch && dateMatch;
  });
  // Get unique hashtags from filtered posts
  const hashtags = Array.from(
    new Set(filtered.map((post) => post.hashtag))
  ).filter(Boolean);
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-4 ">
      <h2 className="text-lg font-bold mb-4 text-indigo-200">Tags</h2>

      <div className="flex flex-wrap gap-2">
        {hashtags.length === 0 && (
          <span className="text-gray-500">
            No hashtags found for selected filters.
          </span>
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
    </div>
  );
}
