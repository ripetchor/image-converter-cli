import type { Image } from 'bun';

import type { ENCODERS } from './constants';

export type ImageFormat = 'webp' | 'jpeg' | 'png' | 'heic' | 'avif';

export interface EncodeOptions {
  quality: number;
  lossless: boolean;
  progressive: boolean;
}

export interface ConvertOptions extends EncodeOptions {
  path: string;
  format: ImageFormat;
}

export interface ExecuteOptions extends EncodeOptions {
  sourceDir: string;
  outputDir?: string;
  format: ImageFormat;
  recursive: boolean;
}
export interface AppConvertOptions extends EncodeOptions {
  sourceDir: string;
  outputDir?: string;
  format: ImageFormat;
  name: string;
  parentPath: string;
}

export interface ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image;
}

export type Encoders = typeof ENCODERS;

export type OnConvertedCallback = (params: { destination: string; bytes: number }) => void;
