"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";

export default function PostsSection({
  selectedSources,
  selectedSentiment,
  selectedDate,
}) {
  const { posts } = useContext(SentimentContext);
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
  return (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 mt-6 w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-100">Posts</h2>
      <div
        className="flex flex-col gap-4 overflow-y-auto"
        style={{ maxHeight: "500px" }}
      >
        {filtered.length === 0 && (
          <div className="text-gray-400">
            No posts found for selected filters.
          </div>
        )}
        {filtered.map((post, idx) => (
          <div
            key={idx}
            className="border-b border-gray-800 pb-4 last:border-b-0"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 font-semibold">
                {post.platform_name}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded font-semibold ${
                  post.sentiment === "Positive"
                    ? "bg-green-900 text-green-300"
                    : post.sentiment === "Negative"
                    ? "bg-red-900 text-red-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
              >
                {post.sentiment}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {post.publish_date}
              </span>
            </div>
            <div className="text-base text-gray-100">{post.title}</div>
            <div className="text-sm text-gray-400">{post.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
