import { file, Image } from 'bun';

import type { ConvertOptions, Encoders } from './types';

export class ImageConverter {
  private readonly encoders: Encoders;

  constructor(encoders: Encoders) {
    this.encoders = encoders;
  }

  public convert(options: ConvertOptions): Image {
    const { path, format, quality, lossless, progressive } = options;

    const image = file(path).image();

    return this.encoders[format].encode(image, { quality, lossless, progressive });
  }
}
