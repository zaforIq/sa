"use client";
import React, { useContext } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { SentimentContext } from "../context/SentimentContext";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ChartSection() {
  const { platforms, summary } = useContext(SentimentContext);

  const barData = {
    labels: platforms.map((p) => p.name),
    datasets: [
      {
        label: "Positive",
        data: platforms.map((p) => p.positive),
        backgroundColor: "#4ade80",
      },
      {
        label: "Neutral",
        data: platforms.map((p) => p.neutral),
        backgroundColor: "#fbbf24",
      },
      {
        label: "Negative",
        data: platforms.map((p) => p.negative),
        backgroundColor: "#f87171",
      },
    ],
  };

  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [summary.positive, summary.neutral, summary.negative],
        backgroundColor: ["#4ade80", "#fbbf24", "#f87171"],
      },
    ],
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-900">
        Sentiment Charts
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="w-[350px]">
          <h3 className="text-center mb-2 text-lg font-medium text-gray-700">
            Platform Sentiment Breakdown
          </h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
        <div className="w-[250px]">
          <h3 className="text-center mb-2 text-lg font-medium text-gray-700">
            Overall Sentiment
          </h3>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </section>
  );
}
