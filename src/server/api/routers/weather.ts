/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define types for weather data based on OpenWeather One Call API
interface WeatherData {
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
  }>;
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: number;
    pop: number;
    uvi: number;
  }>;
}

export const weatherRouter = createTRPCRouter({
  getWeather: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lon: z.number(),
        units: z.enum(["standard", "metric", "imperial"]).default("imperial"),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.WEATHER_API_URL}/data/3.0/onecall?lat=${input.lat}&lon=${input.lon}&units=${input.units}&appid=${env.WEATHER_API_KEY}&exclude=minutely,alerts`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weather: WeatherData = await response.json();
      return weather;
    }),
});
