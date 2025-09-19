"use client";
import React, { createContext } from "react";
import trendingData from "../utils/trending_data.json";

export const TrendingContext = createContext({
  trending: [],
});

export function TrendingProvider({ children }) {
  const trending = trendingData;
  return (
    <TrendingContext.Provider value={{ trending }}>
      {children}
    </TrendingContext.Provider>
  );
}
