"use client";
import React, { useContext } from "react";
import SentimentBar from "./SentimentBar";
import { SentimentContext } from "../context/SentimentContext";

export default function PlatformTable() {
  const { platforms } = useContext(SentimentContext);
  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-900">
        Platform Breakdown
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Platform</th>
            <th className="text-center p-2">Posts</th>
            <th className="text-center p-2">Positive</th>
            <th className="text-center p-2">Neutral</th>
            <th className="text-center p-2">Negative</th>
            <th className="text-center p-2">Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((p) => (
            <tr key={p.name} className="border-b border-gray-100">
              <td className="p-2">{p.name}</td>
              <td className="text-center p-2">{p.posts}</td>
              <td className="text-center p-2 text-green-500 font-bold">
                {p.positive}
              </td>
              <td className="text-center p-2 text-yellow-500 font-bold">
                {p.neutral}
              </td>
              <td className="text-center p-2 text-red-500 font-bold">
                {p.negative}
              </td>
              <td className="text-center p-2">
                <SentimentBar
                  positive={p.positive}
                  neutral={p.neutral}
                  negative={p.negative}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
