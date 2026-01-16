"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export type Tier = "silver" | "gold" | "diamond";

interface PointsContextType {
  points: number;
  tier: Tier;
  addPoints: (amount: number) => void;
  setPoints: (amount: number) => void;
  setTier: (tier: Tier) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPointsState] = useState(1214);
  const [tier, setTierState] = useState<Tier>("gold");

  const addPoints = useCallback((amount: number) => {
    setPointsState((prev) => prev + amount);
  }, []);

  const setPoints = useCallback((amount: number) => {
    setPointsState(amount);
  }, []);

  const setTier = useCallback((newTier: Tier) => {
    setTierState(newTier);
  }, []);

  return (
    <PointsContext.Provider
      value={{ points, tier, addPoints, setPoints, setTier }}
    >
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}
