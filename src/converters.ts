import { file } from 'bun';
import { readdir } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { isFile, isImage } from './helpers';
import type { ConvertMultipleOptions, ConvertOptions } from './types';

async function convert(options: ConvertOptions) {
  const {
    name,
    parentPath,
    outputDir,
    format = 'webp',
    quality = 80,
    lossless = false,
    progressive = false,
  } = options;

  const image = file(parentPath + name).image();

  const converter = {
    webp: () => image.webp({ quality, lossless }),
    jpeg: () => image.jpeg({ quality, progressive }),
    png: () => image.png(),
    heic: () => image.heic({ quality }),
    avif: () => image.avif({ quality }),
  };

  const result = converter[format]();

  const fileName = basename(name, extname(name));

  const destination = resolve(outputDir || parentPath, fileName + '.' + format);

  await result.write(destination);

  console.log('Successfully converted: ', destination);
}

export async function convertImages({
  sourceDir,
  outputDir,
  format,
  quality,
  lossless,
  progressive,
}: ConvertMultipleOptions) {
  const dir = await readdir(sourceDir, { withFileTypes: true });

  const files = dir.filter(isFile);

  const images = files.filter(isImage);

  await Promise.all(
    images.map(({ name, parentPath }) => {
      convert({
        name,
        parentPath,
        outputDir,
        format,
        quality,
        lossless,
        progressive,
      });
    }),
  );
}
