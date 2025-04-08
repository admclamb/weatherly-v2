"use client";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import SidebarLayout from "~/app/_components/layout/sidebar-layout";
import { routerConfig } from "~/app/router-config";
import { CurrentWeather } from "./current-weather";
import { useWeather } from "./weather.provider";

export default function Weather() {
  const { location, error } = useWeather();

  if (!location) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { name: "Home", href: routerConfig.root.path },
          { name: "Weather", href: routerConfig.weather.path },
        ]}
      >
        <div className="container mx-auto p-6">
          <p className="text-muted-foreground">
            Please select a location to view weather information.
          </p>
        </div>
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { name: "Home", href: routerConfig.root.path },
          { name: "Weather", href: routerConfig.weather.path },
        ]}
      >
        <div className="container mx-auto p-6">
          <p className="text-destructive">{error.message}</p>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { name: "Home", href: routerConfig.root.path },
        { name: "Weather", href: routerConfig.weather.path },
        { name: `${location.name}, ${location.country}` },
      ]}
    >
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {location.name}
            {location.state && `, ${location.state}`}
          </h1>
          <p className="text-muted-foreground">{location.country}</p>
        </div>

        <div className="grid gap-6">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Current Conditions</h2>
            <CurrentWeather />
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href={routerConfig.hourly.execute({
                lat: location.lat,
                lon: location.lon,
              })}
              className="hover:bg-muted/50 group rounded-lg border p-4 transition-colors"
            >
              <h3 className="text-lg font-semibold">Hourly Forecast</h3>
              <p className="text-muted-foreground text-sm">
                View hour-by-hour weather prediction
              </p>
            </a>

            <a
              href={routerConfig.daily.execute({
                lat: location.lat,
                lon: location.lon,
              })}
              className="hover:bg-muted/50 group rounded-lg border p-4 transition-colors"
            >
              <h3 className="text-lg font-semibold">Daily Forecast</h3>
              <p className="text-muted-foreground text-sm">
                See the weather for the next 7 days
              </p>
            </a>

            <a
              href={routerConfig.search.path}
              className="hover:bg-muted/50 group rounded-lg border p-4 transition-colors"
            >
              <h3 className="text-lg font-semibold">Change Location</h3>
              <p className="text-muted-foreground text-sm">
                Search for a different location
              </p>
            </a>
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
}
