import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imagesToOptimize = [
  'src/assets/carousel/boats-marina.jpg',
  'src/assets/carousel/motors-hero.jpg',
  'src/assets/carousel/lubricants-hero.jpg',
  'src/assets/boat-deck.png',
];

const optimizeImage = async (relativePath) => {
  const absolutePath = path.join(rootDir, relativePath);
  const parsed = path.parse(absolutePath);

  const avifPath = path.join(parsed.dir, `${parsed.name}.avif`);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

  await sharp(absolutePath)
    .rotate()
    .avif({ quality: 45, effort: 6 })
    .toFile(avifPath);

  await sharp(absolutePath)
    .rotate()
    .webp({ quality: 72, effort: 6 })
    .toFile(webpPath);

  return { relativePath, avifPath, webpPath };
};

const run = async () => {
  console.log('Optimizing source images...');

  for (const imagePath of imagesToOptimize) {
    try {
      const result = await optimizeImage(imagePath);
      console.log(`✓ ${result.relativePath}`);
    } catch (error) {
      console.error(`✗ ${imagePath}`);
      console.error(error);
      process.exitCode = 1;
    }
  }
};

run();
