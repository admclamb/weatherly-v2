type RouteConfig = {
  path: string;
};

type RouterConfig = {
  root: RouteConfig;
};

export const routerConfig: RouterConfig = {
  root: {
    path: "/",
  },
};
