import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = process.argv[2];

if (!outputDirectory || !path.basename(outputDirectory).startsWith("wps-ai-pages-")) {
  throw new Error("Pass a dedicated wps-ai-pages-* export directory.");
}

const response = await fetch("http://127.0.0.1:4173/");
if (!response.ok) {
  throw new Error(`Unable to render the production page: ${response.status}`);
}

const renderedHtml = await response.text();
const portableHtml = renderedHtml
  .replaceAll('="/_next/', '="./_next/')
  .replaceAll('css:/_next/', 'css:./_next/')
  .replaceAll('\\"/_next/', '\\"./_next/');

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp("dist/client", outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "index.html"), portableHtml);
await writeFile(path.join(outputDirectory, ".nojekyll"), "");
