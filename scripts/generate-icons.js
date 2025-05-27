import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIcons() {
  const sizes = [16, 32, 180, 192, 512];
  const inputSvg = join(__dirname, '../public/icon.svg');
  const publicDir = join(__dirname, '../public');

  // Read the SVG file
  const svgBuffer = await fs.readFile(inputSvg);

  // Generate each size
  for (const size of sizes) {
    const fileName = size === 180 
      ? 'apple-touch-icon.png'
      : size === 16 
        ? 'favicon-16x16.png'
        : size === 32
          ? 'favicon-32x32.png'
          : `android-chrome-${size}x${size}.png`;

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, fileName));

    console.log(`Generated ${fileName}`);
  }

  // Generate ICO file for favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(join(publicDir, 'favicon.ico'));

  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error);
