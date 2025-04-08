"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { routerConfig } from "~/app/router-config";
import { toast } from "sonner";

export default function HeroSearch() {
  const [location, setLocation] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    router.push(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      routerConfig.search.execute({ search: location }),
    );
  };

  const handleCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location found:", { latitude, longitude });

        router.push(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          routerConfig.search.execute({
            search: `${latitude},${longitude}`,
          }),
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Failed to get your location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to use this feature";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className="relative w-full">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            className="pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {isFocused && (
        <div className="bg-background absolute z-10 mt-1 w-full rounded-md border shadow-lg">
          <button
            type="button"
            className="hover:bg-muted flex w-full items-center gap-2 px-4 py-2 text-sm"
            onClick={handleCurrentLocation}
          >
            <MapPin className="h-4 w-4" />
            Use current location
          </button>
        </div>
      )}
    </div>
  );
}
