/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import Link from "next/link";
import { env } from "~/env";
import SidebarLayout from "~/app/_components/layout/sidebar-layout";
import { routerConfig } from "~/app/router-config";
import NavbarSearch from "./navbar-search";
import { DarkModeToggle } from "../theme/dark-mode-toggle";

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface SearchProps {
  searchParams?: Promise<{
    q?: string;
  }>;
}

async function getLocations(query: string): Promise<Location[]> {
  const response = await fetch(
    `${env.WEATHER_API_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${env.WEATHER_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
}

export default async function Search({ searchParams }: SearchProps) {
  const query = (await searchParams)?.q;

  if (!query) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { name: "Home", href: routerConfig.root.path },
          { name: "Search", href: routerConfig.search.path },
        ]}
        headerContent={
          <ul className="flex items-center gap-3">
            <li>
              <NavbarSearch />
            </li>
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        }
      >
        <div className="container mx-auto px-5 py-8">
          <h1 className="mb-6 text-2xl font-bold">Search Results</h1>
          <div className="text-muted-foreground">
            Enter a location to search for weather data.
          </div>
        </div>
      </SidebarLayout>
    );
  }

  const locations = await getLocations(query);

  return (
    <SidebarLayout
      breadcrumbs={[
        { name: "Home", href: routerConfig.root.path },
        { name: "Search", href: routerConfig.search.path },
      ]}
      headerContent={
        <ul className="flex items-center gap-3">
          <li>
            <NavbarSearch />
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      }
    >
      <div className="container mx-auto px-5 py-8">
        <h1 className="mb-6 text-2xl font-bold">
          Search Results For &apos;{query}&apos;
        </h1>

        {locations.length === 0 && query && (
          <div className="text-muted-foreground">
            No locations found for &quot;{query}&quot;
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations?.map((location) => (
            <div
              key={`${location.lat}-${location.lon}`}
              className="bg-card rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{location.name}</h2>
              <p className="text-muted-foreground text-sm">
                {location.country}
                {location.state && `, ${location.state}`}
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  href={routerConfig.weather.execute({
                    lat: location.lat,
                    lon: location.lon,
                  })}
                  className="text-primary text-sm hover:underline"
                >
                  View Weather
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
