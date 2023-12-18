import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      fileName: "index",
      entry: "src/index.ts",
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "./build-report.local.html",
        }),
      ],
    },
  },
});
