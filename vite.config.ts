import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    dts(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "./dist/build-report.html",
        }),
      ],
    },
    lib: {
      fileName: "index",
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
    },
    minify: true,
    sourcemap: true,
  },
});
