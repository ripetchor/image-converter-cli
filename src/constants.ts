import { AvifEncoder, HeicEncoder, JpegEncoder, PngEncoder, WebpEncoder } from './encoders';
import type { ImageEncoder, ImageFormat } from './types';

export const IMAGE_FORMATS = new Set(['.jpeg', '.jpg', '.png', '.webp', '.heic', '.avif']);

export const ENCODERS: Record<ImageFormat, ImageEncoder> = {
  webp: new WebpEncoder(),
  jpeg: new JpegEncoder(),
  png: new PngEncoder(),
  heic: new HeicEncoder(),
  avif: new AvifEncoder(),
} as const;
