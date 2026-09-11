import type { ImageEncoder, ImageFormat } from './types';

import { AvifEncoder, HeicEncoder, JpegEncoder, PngEncoder, WebpEncoder } from './encoders';

export const IMAGE_FORMATS = new Set(['.avif', '.heic', '.jpeg', '.jpg', '.png', '.webp']);

export const ENCODERS: Record<ImageFormat, ImageEncoder> = {
  avif: new AvifEncoder(),
  heic: new HeicEncoder(),
  jpeg: new JpegEncoder(),
  png: new PngEncoder(),
  webp: new WebpEncoder(),
} as const;
