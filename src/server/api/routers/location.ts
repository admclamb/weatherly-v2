/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define types for location data based on OpenWeather Geocoding API
interface Location {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const locationRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(5).default(5),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.WEATHER_API_URL}/geo/1.0/direct?` +
          new URLSearchParams({
            q: input.query,
            limit: input.limit.toString(),
            appid: env.WEATHER_API_KEY,
          }),
        { next: { revalidate: 3600 } }, // Cache for 1 hour
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const locations: Location[] = await response.json();
      return locations;
    }),

  getByCoordinates: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lon: z.number(),
        limit: z.number().min(1).max(5).default(1),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.WEATHER_API_URL}/geo/1.0/reverse?lat=${input.lat}&lon=${input.lon}&limit=${input.limit}&appid=${env.WEATHER_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const locations: Location[] = await response.json();
      return locations[0] ?? null;
    }),
});
