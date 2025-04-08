"use client";

import React, { createContext, useContext } from "react";
import type { RouterOutputs } from "~/trpc/react";

type WeatherData = RouterOutputs["weather"]["getWeather"];
type LocationData = RouterOutputs["location"]["getByCoordinates"];

interface WeatherContextType {
  weather: WeatherData | null;
  location: LocationData | null;
  isLoading: boolean;
  error: Error | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export function WeatherProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: WeatherContextType;
}) {
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
