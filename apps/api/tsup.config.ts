import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  format: ["esm"],
  target: "node20",
  outDir: "dist",
  splitting: false,
  clean: true,
  platform: "node",
  bundle: true,
  external: ["pg", "dotenv"],
  shims: true,
});
