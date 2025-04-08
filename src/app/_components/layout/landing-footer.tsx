import React from "react";
import Logo from "../logo/logo";

export default function LandingFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/admclamb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Built by admclamb
            </a>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              OpenWeather
            </a>
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Weather API
            </a>
            <span>
              Powered by{" "}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground font-medium"
              >
                OpenWeather
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
