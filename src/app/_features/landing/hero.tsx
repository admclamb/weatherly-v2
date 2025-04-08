import React from "react";
import HeroSearch from "../search/hero-search";

export default function Hero() {
  return (
    <section className="container mx-auto flex min-h-[40vh] flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Check Your Local Weather
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Get instant access to current weather conditions and forecasts for any
          location.
        </p>
      </div>

      <div className="w-full max-w-md">
        <HeroSearch />
      </div>
    </section>
  );
}
