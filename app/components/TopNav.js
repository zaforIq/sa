"use client";
import React from "react";

export default function TopNav({ onSearch }) {
  return (
    <nav className="w-full bg-indigo-900 py-4 flex items-center justify-center shadow-md sticky top-0 z-10">
      <div className="w-full max-w-3xl flex items-center justify-between gap-4 px-4">
        <span className="font-extrabold text-xl text-white tracking-tight">
          Sentiment Dashboard
        </span>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border-none text-base w-44 bg-gray-100 text-indigo-900 outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
    </nav>
  );
}
