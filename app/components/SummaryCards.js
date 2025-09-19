"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";

export default function SummaryCards({
  selectedSources = [],
  selectedSentiment = "All",
  selectedDate = "",
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
  const total = filtered.length;
  const positive = filtered.filter((p) => p.sentiment === "Positive").length;
  const neutral = filtered.filter((p) => p.sentiment === "Neutral").length;
  const negative = filtered.filter((p) => p.sentiment === "Negative").length;
  return (
    <section className="flex flex-wrap gap-6 mb-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 flex-1 min-w-[200px]">
        <h2 className="text-lg font-semibold mb-2 text-gray-100">
          Total Posts
        </h2>
        <div className="text-3xl font-bold text-gray-100">{total}</div>
      </div>
      <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-xl shadow-md p-6 flex-1 min-w-[200px]">
        <h2 className="text-lg font-semibold mb-2 text-green-100">Positive</h2>
        <div className="text-3xl font-bold text-green-100">{positive}</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-900 to-yellow-700 rounded-xl shadow-md p-6 flex-1 min-w-[200px]">
        <h2 className="text-lg font-semibold mb-2 text-yellow-100">Neutral</h2>
        <div className="text-3xl font-bold text-yellow-100">{neutral}</div>
      </div>
      <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-xl shadow-md p-6 flex-1 min-w-[200px]">
        <h2 className="text-lg font-semibold mb-2 text-red-100">Negative</h2>
        <div className="text-3xl font-bold text-red-100">{negative}</div>
      </div>
    </section>
  );
}
