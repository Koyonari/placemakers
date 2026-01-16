"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export interface Reward {
  id: number;
  icon: string;
  title: string;
  location: string;
  road: string;
  unit: string;
  date: string;
  points: number;
}

interface RewardsContextType {
  rewards: Reward[];
  addReward: (reward: Reward) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Sheng Siong Supermarket",
      road: "352 Clementi Ave 2",
      unit: "#01-91/93/95/97/99",
      date: "Jan 6, 2026",
      points: 10,
    },
    {
      id: 2,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "FairPrice (Clementi Ave 2)",
      road: "352 Clementi Ave 2",
      unit: "#01-141 / #01-143",
      date: "Jan 6, 2026",
      points: 10,
    },
    {
      id: 3,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "VN Super Mart",
      road: "354 Clementi Ave 2",
      unit: "#01",
      date: "Jan 5, 2026",
      points: 10,
    },
    {
      id: 4,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "DailyFlorist.sg",
      road: "353 Clementi Ave 2",
      unit: "#01-155A",
      date: "Jan 5, 2026",
      points: 10,
    },
    {
      id: 5,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Tian Tian Flower Clementi",
      road: "352 Clementi Ave 2",
      unit: "#01-117",
      date: "Jan 4, 2026",
      points: 10,
    },
    {
      id: 6,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Clementi Florist & Aquarium (C328)",
      road: "328 Clementi Ave 2",
      unit: "#01-210",
      date: "Jan 4, 2026",
      points: 10,
    },
    {
      id: 7,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "LFS Aquarium",
      road: "328 Clementi Ave 2",
      unit: "#01-186",
      date: "Jan 3, 2026",
      points: 10,
    },
    {
      id: 8,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Polyart Aquarium",
      road: "328 Clementi Ave 2",
      unit: "#01-194",
      date: "Jan 3, 2026",
      points: 10,
    },
    {
      id: 9,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Send Itt",
      road: "354 Clementi Ave 2",
      unit: "#01-179",
      date: "Jan 2, 2026",
      points: 10,
    },
    {
      id: 10,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Hoy Yong Seafood Restaurant",
      road: "352 Clementi Ave 2",
      unit: "#01-37",
      date: "Jan 2, 2026",
      points: 10,
    },
    {
      id: 11,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Yosakoi Japanese Food Alley @ Clementi",
      road: "352 Clementi Ave 2",
      unit: "#01-129",
      date: "Jan 1, 2026",
      points: 10,
    },
    {
      id: 12,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Fried Rice @ The Meeting Place",
      road: "353 Clementi Ave 2",
      unit: "#01-70",
      date: "Jan 1, 2026",
      points: 10,
    },
  ]);

  const addReward = useCallback((reward: Reward) => {
    setRewards((prev) => [reward, ...prev]);
  }, []);

  return (
    <RewardsContext.Provider value={{ rewards, addReward }}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return context;
}
