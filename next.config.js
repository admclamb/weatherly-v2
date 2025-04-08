/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.openweathermap.org",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default config;
