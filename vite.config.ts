import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
