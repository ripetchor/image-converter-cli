export type ImageFormat = 'jpeg' | 'png' | 'webp' | 'heic' | 'avif';

export interface Options {
  format?: ImageFormat;
  quality?: number;
  lossless?: boolean;
  progressive?: boolean;
}

export interface ConvertOptions extends Options {
  name: string;
  parentPath: string;
  outputDir?: string;
}

export interface ConvertImagesOptions extends Options {
  sourceDir: string;
  outputDir?: string;
  recursive?: boolean;
}
