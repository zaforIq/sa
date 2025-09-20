"use client";
import React, { createContext } from "react";
import sentimentData from "../utils/sentiment_data.json";

export const SentimentContext = createContext({
  posts: [],
  summary: {},
  platforms: [],
});

function getSummaryAndPlatforms(posts) {
  const summary = {
    totalPosts: posts.length,
    positive: posts.filter((p) => p.sentiment === "Positive").length,
    neutral: posts.filter((p) => p.sentiment === "Neutral").length,
    negative: posts.filter((p) => p.sentiment === "Negative").length,
  };
  const platformsMap = {};
  posts.forEach((post) => {
    if (!platformsMap[post.platform_name]) {
      platformsMap[post.platform_name] = {
        name: post.platform_name,
        posts: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      };
    }
    platformsMap[post.platform_name].posts++;
    if (post.sentiment === "Positive")
      platformsMap[post.platform_name].positive++;
    if (post.sentiment === "Neutral")
      platformsMap[post.platform_name].neutral++;
    if (post.sentiment === "Negative")
      platformsMap[post.platform_name].negative++;
  });
  return { summary, platforms: Object.values(platformsMap) };
}

export function SentimentProvider({ children }) {
  const posts = sentimentData;
  const { summary, platforms } = getSummaryAndPlatforms(posts);
  const value = { posts, summary, platforms };
  return (
    <SentimentContext.Provider value={value}>
      {children}
    </SentimentContext.Provider>
  );
}
