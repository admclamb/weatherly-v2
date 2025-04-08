import React from "react";
import { Cloud, Map, Clock, Thermometer } from "lucide-react";
import LandingLayout from "~/app/_components/layout/landing-layout";
import Hero from "./hero";

const features = [
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Real-Time Weather Data",
    description:
      "Get accurate, up-to-the-minute weather information for any location worldwide.",
  },
  {
    icon: <Map className="h-6 w-6" />,
    title: "Location-Based Forecast",
    description:
      "Simply search for any city or location to get instant weather updates.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Hourly Forecasts",
    description:
      "Plan your day with detailed hourly weather predictions and conditions.",
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    title: "Detailed Metrics",
    description:
      "View temperature, humidity, wind speed, and more weather parameters.",
  },
];

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Everything you need to know about the weather
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background flex flex-col items-center rounded-lg p-6 text-center"
              >
                <div className="bg-primary/10 text-primary mb-4 rounded-full p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
