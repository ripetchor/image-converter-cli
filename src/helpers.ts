import type { Dirent } from 'node:fs';
import { extname } from 'node:path';
import type { ImageFormat } from './types';

export function isImage(imageFormats: Set<string>) {
  return function (dirent: Dirent<string>) {
    return dirent.isFile() && imageFormats.has(extname(dirent.name));
  };
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
