"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PostsLineChart({ selectedSources, selectedSentiment }) {
  const { posts } = useContext(SentimentContext);
  // Get all sources
  const allSources = Array.from(new Set(posts.map((post) => post.source)));
  const sources = selectedSources.length === 0 ? allSources : selectedSources;

  // Sentiment types
  const sentiments = ["positive", "negative", "neutral"];

  // Prepare datasets for each sentiment
  const datasets = sentiments.map((sentiment) => {
    return {
      label: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
      data: sources.map((source) => {
        return posts.filter(
          (post) =>
            post.source === source &&
            post.sentiment === sentiment &&
            (selectedSentiment === "All" ||
              post.sentiment === selectedSentiment)
        ).length;
      }),
      borderColor:
        sentiment === "positive"
          ? "#22c55e"
          : sentiment === "negative"
          ? "#ef4444"
          : "#fbbf24",
      backgroundColor:
        sentiment === "positive"
          ? "rgba(34,197,94,0.2)"
          : sentiment === "negative"
          ? "rgba(239,68,68,0.2)"
          : "rgba(251,191,36,0.2)",
      fill: false,
      tension: 0.4,
    };
  });

  const data = {
    labels: sources,
    datasets: datasets,
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-2 text-gray-100">
        Sentiment by Source
      </h3>
      <Line data={data} />
    </div>
  );
}
