import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/calendar.tsx"),
  route("day/:date", "routes/day.$date.tsx"),
] satisfies RouteConfig;
