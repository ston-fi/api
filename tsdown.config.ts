import { defineConfig, type UserConfig } from "tsdown";

export default defineConfig(() => {
  const sharedOptions = {
    entry: ["src/index.ts"],
    dts: true,
    noExternal: ["camelcase-keys", "decamelize-keys"],
    platform: "neutral",
    plugins: [],
    attw: true,
    publint: true,
  } satisfies UserConfig;

  return [
    {
      ...sharedOptions,
      format: "esm" as const,
      outDir: "dist/esm",
    },
    {
      ...sharedOptions,
      format: "cjs" as const,
      outDir: "dist/cjs",
    },
  ];
});
