import React from "react";
import { WeatherProvider } from "../_features/weather/weather.provider";
import { api } from "~/trpc/server";
import { type UnitSystem } from "../_features/units/units.provider";

interface WeatherLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lat?: string; lon?: string }>; // Changed from params to searchParams
}

export default async function WeatherLayout({
  children,
  params, // Changed from params to searchParams
  units = "imperial",
}: WeatherLayoutProps & { units?: UnitSystem }) {
  const searchParams = await params;
  const lat = searchParams?.lat;
  const lon = searchParams?.lon;

  console.log("LAT: ", lat, lon);

  if (!lat || !lon) {
    return (
      <WeatherProvider
        value={{
          weather: null,
          location: null,
          isLoading: false,
          error: new Error("Missing coordinates"),
        }}
      >
        {children}
      </WeatherProvider>
    );
  }

  try {
    const [weather, location] = await Promise.all([
      api.weather.getWeather({
        lat: Number(lat),
        lon: Number(lon),
        units,
      }),
      api.location.getByCoordinates({
        lat: Number(lat),
        lon: Number(lon),
      }),
    ]);

    console.log("HERE: ", weather, location);

    return (
      <WeatherProvider
        value={{
          weather,
          location,
          isLoading: false,
          error: null,
        }}
      >
        {children}
      </WeatherProvider>
    );
  } catch (error) {
    return (
      <WeatherProvider
        value={{
          weather: null,
          location: null,
          isLoading: false,
          error:
            error instanceof Error ? error : new Error("Failed to load data"),
        }}
      >
        {children}
      </WeatherProvider>
    );
  }
}
