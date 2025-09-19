"use client";

import { SentimentProvider } from "./context/SentimentContext";
import { TrendingProvider } from "./context/TrendingContext";
import SummaryCards from "./components/SummaryCards";
import TrendingSection from "./components/TrendingSection";
import ChartSection from "./components/ChartSection";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import PostsSection from "./components/PostsSection";
import FilterPanel from "./components/FilterPanel";
import TagsPanel from "./components/TagsPanel";
import KeywordsPanel from "./components/KeywordsPanel";
import KeywordsPieChart from "./components/KeywordsPieChart";
import PostsBarChart from "./components/PostsBarChart";

import React, { useState } from "react";

export default function Page() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedSentiment, setSelectedSentiment] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <TrendingProvider>
      <SentimentProvider>
        <div className="font-sans bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-row">
          <SideNav active={activeNav} onSelect={setActiveNav} />
          <div className="flex-1 min-h-screen flex flex-col ml-14 md:ml-44">
            <TopNav onSearch={setSearch} />
            <main className="w-full  mx-auto px-2 sm:px-4 py-8 flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-6">
                <SummaryCards
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                  dark
                />
                <TrendingSection
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                />

                <PostsSection
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                />
                <PostsBarChart
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                />
                {/* <ChartSection dark /> */}
              </div>
              {/* Right Column */}
              <div className="w-full md:w-80 flex flex-col gap-6">
                <FilterPanel
                  selectedSources={selectedSources}
                  setSelectedSources={setSelectedSources}
                  selectedSentiment={selectedSentiment}
                  setSelectedSentiment={setSelectedSentiment}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  dark
                />
                <TagsPanel
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                  dark
                />
                <KeywordsPanel
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                  dark
                />
                <KeywordsPieChart
                  selectedSources={selectedSources}
                  selectedSentiment={selectedSentiment}
                  selectedDate={selectedDate}
                />
              </div>
            </main>
          </div>
        </div>
      </SentimentProvider>
    </TrendingProvider>
  );
}
