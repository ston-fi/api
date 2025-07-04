// @ts-ignore - esbuild-analyzer package is not typed
import AnalyzerPlugin from "esbuild-analyzer";
import { defineConfig, type Options } from "tsup";

const sharedOptions = {
  entryPoints: ["src/", "!src/**/*.test.ts"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: true,
  noExternal: ["camelcase-keys", "decamelize-keys"],
} satisfies Options;

export default defineConfig([
  {
    ...sharedOptions,
    format: "esm",
    outDir: "dist/esm",
    esbuildPlugins: [
      AnalyzerPlugin({
        outfile: "./build-report-esm.local.html",
      }),
    ],
  },
  {
    ...sharedOptions,
    format: "cjs",
    outDir: "dist/cjs",
    esbuildPlugins: [
      AnalyzerPlugin({
        outfile: "./build-report-cjs.local.html",
      }),
    ],
  },
]);
