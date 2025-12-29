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
      id: 2,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Happy Mart @",
      road: "Clementi Blk 123",
      unit: "#01-45",
      date: "Dec 5, 2025",
      points: 10,
    },
    {
      id: 3,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "FairPrice @",
      road: "Clementi Blk 321",
      unit: "#02-12",
      date: "Dec 3, 2025",
      points: 10,
    },
    {
      id: 4,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Sheng Siong @",
      road: "Jurong Blk 456",
      unit: "#01-23",
      date: "Dec 1, 2025",
      points: 10,
    },
    {
      id: 5,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Giant @",
      road: "Tampines Blk 789",
      unit: "#03-56",
      date: "Nov 28, 2025",
      points: 10,
    },
    {
      id: 6,
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Cold Storage @",
      road: "Orchard Plaza",
      unit: "#B1-12",
      date: "Nov 25, 2025",
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
