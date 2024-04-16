import { defineConfig } from "tsup";

/* eslint-disable-next-line import/no-default-export -- default export */
export default defineConfig({
  target: "es2020",
  format: ["cjs", "esm"], 
  splitting: true,
  clean: true, 
  dts: true, 
  minify: true,
  bundle: true,
});
