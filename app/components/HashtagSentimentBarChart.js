"use client";
import React, { useContext } from "react";
import { SentimentContext } from "../context/SentimentContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HashtagSentimentBarChart({ selectedSources = [] }) {
  const { posts } = useContext(SentimentContext);
  // Filter posts by source only
  const showAllSources =
    selectedSources.length === 0 || selectedSources.includes("All");
  const filtered = posts.filter(
    (post) => showAllSources || selectedSources.includes(post.platform_name)
  );
  // Get unique hashtags
  const hashtags = Array.from(
    new Set(filtered.map((post) => post.hashtag))
  ).filter(Boolean);
  // Sentiment types
  const sentiments = ["positive", "negative", "neutral"];
  // Prepare datasets for each sentiment
  const datasets = sentiments.map((sentiment) => ({
    label: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
    data: hashtags.map(
      (hashtag) =>
        filtered.filter(
          (post) =>
            post.hashtag === hashtag &&
            post.sentiment.toLowerCase() === sentiment
        ).length
    ),
    backgroundColor:
      sentiment === "positive"
        ? "#22c55e"
        : sentiment === "negative"
        ? "#ef4444"
        : "#fbbf24",
  }));
  const data = {
    labels: hashtags,
    datasets,
  };
  const options = {
    indexAxis: "y", // horizontal grouped bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: "Sentiment by Hashtag",
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
        title: { display: true, text: "Sentiment Value", color: "#fff" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
        title: { display: true, text: "Hashtags", color: "#fff" },
      },
    },
  };
  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
      <Bar data={data} options={options} />
    </div>
  );
}
