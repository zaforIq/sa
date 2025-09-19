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

export default function PostsBarChart() {
  const { platforms } = useContext(SentimentContext);
  const data = {
    labels: platforms.map((p) => p.name),
    datasets: [
      {
        label: "Positive",
        data: platforms.map((p) => p.positive),
        backgroundColor: "#10b981",
      },
      {
        label: "Neutral",
        data: platforms.map((p) => p.neutral),
        backgroundColor: "#fbbf24",
      },
      {
        label: "Negative",
        data: platforms.map((p) => p.negative),
        backgroundColor: "#ef4444",
      },
    ],
  };
  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-2 text-gray-100">
        Posts by Platform & Sentiment
      </h3>
      <Bar data={data} />
    </div>
  );
}
