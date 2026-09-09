import type { Dirent } from 'node:fs';
import { extname } from 'node:path';
import type { Format } from './types';

export function isImage({ name }: Dirent<string>) {
  return (
    extname(name) === '.jpeg' ||
    extname(name) === '.jpg' ||
    extname(name) === '.png' ||
    extname(name) === '.webp' ||
    extname(name) === '.heic' ||
    extname(name) === '.avif'
  );
}

export function isFIle(dirent: Dirent<string>) {
  return dirent.isFile();
}

export function isFormat(value: unknown): value is Format {
  return (
    value === 'webp' || value === 'jpeg' || value === 'png' || value === 'heic' || value === 'avif'
  );
}

export function assertImageFormat(value: unknown): asserts value is Format {
  if (typeof value !== 'string') {
    throw new TypeError('--format must be a string');
  }

  if (!isFormat(value)) {
    throw new Error(`
      Unsupported format: ${value}
      Supported formats: jpeg, png, webp, heic, avif
      `);
  }
}
