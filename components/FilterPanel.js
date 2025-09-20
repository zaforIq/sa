"use client";
import React, { useState } from "react";
import {
  FaFilter,
  FaUsers,
  FaRegSmile,
  FaRegCalendarAlt,
  FaFacebook,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaNewspaper,
  FaGlobe,
} from "react-icons/fa";

const sources = [
  { name: "All", icon: null },
  { name: "Facebook", icon: <FaFacebook className="w-4 h-4 text-blue-500" /> },
  { name: "X", icon: <FaTwitter className="w-4 h-4 text-sky-400" /> },
  {
    name: "Telegram",
    icon: <FaTelegramPlane className="w-4 h-4 text-blue-400" />,
  },
  { name: "YouTube", icon: <FaYoutube className="w-4 h-4 text-red-500" /> },
  {
    name: "National News Papers",
    icon: <FaNewspaper className="w-4 h-4 text-gray-300" />,
  },
  {
    name: "International News Papers",
    icon: <FaGlobe className="w-4 h-4 text-green-400" />,
  },
];
const sentiments = ["All", "Positive", "Neutral", "Negative"];

export default function FilterPanel({
  selectedSources,
  setSelectedSources,
  selectedSentiment,
  setSelectedSentiment,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 mb-6 w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-100 flex items-center gap-2">
        <FaFilter className="w-5 h-5 text-indigo-400" /> Filter
      </h2>
      <div className="mb-4">
        <div className="font-semibold mb-2 text-gray-100 flex items-center gap-2">
          <FaUsers className="w-4 h-4 text-indigo-400" /> Sources
        </div>
        <div className="flex flex-col gap-2">
          {sources.map((srcObj) => (
            <label
              key={srcObj.name}
              className="flex items-center gap-2 text-gray-200"
            >
              <input
                type="checkbox"
                checked={
                  srcObj.name === "All"
                    ? selectedSources.length === 0 ||
                      selectedSources.includes("All")
                    : selectedSources.includes(srcObj.name)
                }
                onChange={() => {
                  if (srcObj.name === "All") {
                    setSelectedSources(["All"]);
                  } else {
                    setSelectedSources(
                      selectedSources.includes(srcObj.name)
                        ? selectedSources.filter((s) => s !== srcObj.name)
                        : [
                            ...selectedSources.filter((s) => s !== "All"),
                            srcObj.name,
                          ]
                    );
                  }
                }}
                className="accent-indigo-600"
              />
              {srcObj.icon && srcObj.icon}
              {srcObj.name}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2 text-gray-100 flex items-center gap-2">
          <FaRegSmile className="w-4 h-4 text-indigo-400" /> Sentiment
        </div>
        <select
          value={selectedSentiment}
          onChange={(e) => setSelectedSentiment(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-gray-100"
        >
          {sentiments.map((s) => (
            <option key={s} value={s} className="bg-gray-900 text-gray-100">
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2 text-gray-100 flex items-center gap-2">
          <FaRegCalendarAlt className="w-4 h-4 text-indigo-400" /> Date
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-400 bg-gray-900 text-gray-100"
        />
      </div>
    </div>
  );
}
