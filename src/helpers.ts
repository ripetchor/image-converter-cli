import type { Dirent } from 'node:fs';
import { basename, extname, relative, resolve } from 'node:path';
import { IMAGE_FORMATS } from './constants';
import type { ImageFormat } from './types';

export function isImage(dirent: Dirent<string>): boolean {
  return dirent.isFile() && IMAGE_FORMATS.has(extname(dirent.name));
}

export function isImageFormat(value: unknown): value is ImageFormat {
  return (
    value === 'webp' || value === 'jpeg' || value === 'png' || value === 'heic' || value === 'avif'
  );
}

export function assertImageFormat(value: unknown): asserts value is ImageFormat {
  if (typeof value !== 'string') {
    throw new TypeError('--format must be a string');
  }

  if (!isImageFormat(value)) {
    throw new Error(`
      Unsupported format: ${value}
      Supported formats: jpeg, png, webp, heic, avif
      `);
  }
}

export function resolveImageDestination(options: {
  sourceDir: string;
  outputDir?: string;
  parentPath: string;
  name: string;
  format: string;
}): string {
  const { sourceDir, outputDir, parentPath, name, format } = options;

  const destinationDir = outputDir
    ? resolve(outputDir, relative(sourceDir, parentPath))
    : parentPath;

  const fileName = basename(name, extname(name));

  return resolve(destinationDir, `${fileName}.${format}`);
}
