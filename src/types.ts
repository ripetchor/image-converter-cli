import type { Image } from 'bun';

import type { ENCODERS } from './constants';

export interface AppConvertOptions extends EncodeOptions {
  format: ImageFormat;
  name: string;
  outputDir?: string;
  parentPath: string;
  sourceDir: string;
}

export interface ConvertOptions extends EncodeOptions {
  format: ImageFormat;
  path: string;
}

export interface EncodeOptions {
  lossless: boolean;
  progressive: boolean;
  quality: number;
}

export type Encoders = typeof ENCODERS;
export interface ExecuteOptions extends EncodeOptions {
  format: ImageFormat;
  outputDir?: string;
  recursive: boolean;
  sourceDir: string;
}

export interface ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image;
}

export type ImageFormat = 'avif' | 'heic' | 'jpeg' | 'png' | 'webp';

export type OnConvertedCallback = (params: { bytes: number; destination: string }) => void;
