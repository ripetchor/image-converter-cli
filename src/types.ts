export type Format = 'jpeg' | 'png' | 'webp' | 'heic' | 'avif';

export interface Options {
  format?: Format;
  quality?: number;
  lossless?: boolean;
  progressive?: boolean;
}

export interface ConvertOptions extends Options {
  name: string;
  parentPath: string;
  destinationDir?: string;
}

export interface ConvertMultipleOptions extends Options {
  sourceDir: string;
  destinationDir?: string;
}
