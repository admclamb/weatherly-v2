"use client";

import React, { createContext, useContext, useState } from "react";

export type UnitSystem = "imperial" | "metric";

interface UnitsContextType {
  units: UnitSystem;
  setUnits: (units: UnitSystem) => void;
  // Helper functions for temperature conversions
  formatTemperature: (temp: number) => string;
  formatSpeed: (speed: number) => string;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export function useUnits() {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
}

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = useState<UnitSystem>("imperial");

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°${units === "imperial" ? "F" : "C"}`;
  };

  const formatSpeed = (speed: number) => {
    return `${Math.round(speed)} ${units === "imperial" ? "mph" : "m/s"}`;
  };

  return (
    <UnitsContext.Provider
      value={{
        units,
        setUnits,
        formatTemperature,
        formatSpeed,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}
