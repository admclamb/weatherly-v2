"use client";

import { useWeather } from "./weather.provider";
import { Card } from "~/components/ui/card";
import { Cloud, Droplets, Wind } from "lucide-react";
import Image from "next/image";

export function CurrentWeather() {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weather) {
    return <div>No weather data available</div>;
  }

  return (
    <Card className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Current Weather</h2>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.current.weather?.[0]?.icon}@2x.png`}
              alt={weather.current.weather?.[0]?.description ?? "Weather icon"}
              className="h-24 w-24"
              width={96}
              height={96}
            />
            <div>
              <div className="text-4xl font-bold">
                {Math.round(weather.current.temp)}°
              </div>
              <div className="text-lg capitalize">
                {weather.current.weather?.[0]?.description ??
                  "No description available"}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="grid content-center gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="text-muted-foreground h-5 w-5" />
            <span>RealFeel® {Math.round(weather.current.feels_like)}°</span>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="text-muted-foreground h-5 w-5" />
            <span>Wind {Math.round(weather.current.wind_speed)} mph</span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="text-muted-foreground h-5 w-5" />
            <span>Humidity {weather.current.humidity}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
