import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type Options } from "tsdown";

export default defineConfig((_) => {
  const sharedOptions = {
    entry: ["src/*", "!src/**/*.test.ts"],
    dts: true,
    noExternal: ["camelcase-keys", "decamelize-keys"],
    platform: "neutral",
    plugins: [],
  } satisfies Options;

  return [
    {
      ...sharedOptions,
      format: "esm",
      outDir: "dist/esm",
      plugins: [
        ...sharedOptions.plugins,
        visualizer({
          filename: `build-report-esm.local.html`,
        }),
      ],
    },
    {
      ...sharedOptions,
      format: "cjs",
      outDir: "dist/cjs",
      plugins: [
        ...sharedOptions.plugins,
        visualizer({
          filename: `build-report-cjs.local.html`,
        }),
      ],
    },
  ];
});
