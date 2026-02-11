/**
 * Gera favicon em tamanhos pequenos a partir de public/LogoPrimary.jpg
 * Execute: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "LogoPrimary.jpg");
const outDir = join(root, "app");

mkdirSync(outDir, { recursive: true });

const publicDir = join(root, "public");
const sizes = [
  { size: 32, path: join(outDir, "icon.png") },
  { size: 32, path: join(publicDir, "favicon-32.png") },
  { size: 16, path: join(publicDir, "favicon-16.png") },
];

const buffer = readFileSync(src);

for (const { size, path } of sizes) {
  await sharp(buffer)
    .resize(size, size)
    .png()
    .toFile(path);
  console.log(`Gerado: ${path} (${size}x${size})`);
}

console.log("Favicon gerado com sucesso.");
