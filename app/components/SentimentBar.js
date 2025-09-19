import React from "react";

export default function SentimentBar({ positive, neutral, negative }) {
  const total = positive + neutral + negative;
  return (
    <div className="flex h-5 rounded-lg overflow-hidden shadow-sm">
      <div
        className="bg-green-400"
        style={{ width: `${(positive / total) * 100}%` }}
      />
      <div
        className="bg-yellow-400"
        style={{ width: `${(neutral / total) * 100}%` }}
      />
      <div
        className="bg-red-400"
        style={{ width: `${(negative / total) * 100}%` }}
      />
    </div>
  );
}
