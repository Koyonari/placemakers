"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  setPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPointsState] = useState(1214);

  const addPoints = useCallback((amount: number) => {
    setPointsState((prev) => prev + amount);
  }, []);

  const setPoints = useCallback((amount: number) => {
    setPointsState(amount);
  }, []);

  return (
    <PointsContext.Provider value={{ points, addPoints, setPoints }}>
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
