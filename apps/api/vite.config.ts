/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
  },
  plugins: [tsconfigPaths()],
});
