import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type UserConfig } from "tsdown";

export default defineConfig((_) => {
  const sharedOptions = {
    entry: ["src/*", "!src/**/*.test.ts"],
    dts: true,
    noExternal: ["camelcase-keys", "decamelize-keys"],
    platform: "neutral",
    plugins: [],
  } satisfies UserConfig;

  return [
    {
      ...sharedOptions,
      format: "esm",
      outDir: "dist/esm",
      plugins: [
        ...sharedOptions.plugins,
        visualizer({
          filename: `build-report-esm.html`,
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
          filename: `build-report-cjs.html`,
        }),
      ],
    },
  ];
});
