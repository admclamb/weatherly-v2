type RouteConfig = {
  path: string;
};

type WeatherParams = {
  lat: number;
  lon: number;
};

type RouterConfig = {
  root: RouteConfig;
  search: RouteConfig & {
    execute: ({
      search,
      lat,
      lon,
    }: {
      search?: string;
      lat?: number;
      lon?: number;
    }) => string;
  };
  weather: RouteConfig & {
    execute: (params: WeatherParams) => string;
  };
  hourly: RouteConfig & {
    execute: (params: WeatherParams) => string;
  };
  daily: RouteConfig & {
    execute: (params: WeatherParams) => string;
  };
  settings: RouteConfig;
};

export const routerConfig: RouterConfig = {
  root: {
    path: "/",
  },
  search: {
    path: "/search",
    execute: ({ search, lat, lon }) => {
      const searchParams = new URLSearchParams();
      if (search) {
        searchParams.set("q", search);
      }
      if (lat || lat === 0) {
        searchParams.set("lat", `${lat}`);
      }
      if (lon || lon === 0) {
        searchParams.set("lon", `${lon}`);
      }
      return `/search?${searchParams.toString()}`;
    },
  },
  weather: {
    path: "/weather",
    execute: ({ lat, lon }) => {
      const searchParams = new URLSearchParams();
      searchParams.set("lat", `${lat}`);
      searchParams.set("lon", `${lon}`);
      return `/weather?${searchParams.toString()}`;
    },
  },
  hourly: {
    path: "/weather/hourly",
    execute: ({ lat, lon }) => {
      const searchParams = new URLSearchParams();
      searchParams.set("lat", `${lat}`);
      searchParams.set("lon", `${lon}`);
      return `/weather/hourly?${searchParams.toString()}`;
    },
  },
  daily: {
    path: "/weather/daily",
    execute: ({ lat, lon }) => {
      const searchParams = new URLSearchParams();
      searchParams.set("lat", `${lat}`);
      searchParams.set("lon", `${lon}`);
      return `/weather/daily?${searchParams.toString()}`;
    },
  },
  settings: {
    path: "/settings",
  },
};
