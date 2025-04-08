"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter city name..."
              className="pl-10"
            />
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
    </section>
  );
}
