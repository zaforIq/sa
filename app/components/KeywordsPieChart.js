"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function KeywordsPieChart({
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
  // Count keywords
  const keywordCounts = {};
  filtered.forEach((post) => {
    if (post.keyword) {
      keywordCounts[post.keyword] = (keywordCounts[post.keyword] || 0) + 1;
    }
  });
  const data = {
    labels: Object.keys(keywordCounts),
    datasets: [
      {
        data: Object.values(keywordCounts),
        backgroundColor: [
          "#6366f1",
          "#f59e42",
          "#10b981",
          "#ef4444",
          "#fbbf24",
          "#3b82f6",
          "#a78bfa",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-2 text-gray-100">
        Keywords Distribution
      </h3>
      <Pie data={data} />
    </div>
  );
}
