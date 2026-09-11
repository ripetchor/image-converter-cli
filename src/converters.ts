import { file } from 'bun';
import { readdir } from 'node:fs/promises';
import { basename, extname, relative, resolve } from 'node:path';
import { IMAGE_FORMATS } from './constants';
import { isImage } from './helpers';
import type { ConvertImagesOptions, ConvertOptions } from './types';

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

  const image = file(resolve(parentPath, name)).image();

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
  recursive,
}: ConvertImagesOptions) {
  const dir = await readdir(sourceDir, { withFileTypes: true, recursive });

  const images = dir.filter(isImage(IMAGE_FORMATS));

  await Promise.all(
    images.map(({ name, parentPath }) => {
      let destinationDir = outputDir
        ? resolve(outputDir, relative(sourceDir, parentPath))
        : parentPath;

      convert({
        name,
        parentPath,
        outputDir: destinationDir,
        format,
        quality,
        lossless,
        progressive,
      });
    }),
  );
}
