import type { Image } from "bun";

import { file } from "bun";

import type { ConvertOptions, Encoders } from "./types";

export class ImageConverter {
  private readonly encoders: Encoders;

  public constructor(encoders: Encoders) {
    this.encoders = encoders;
  }

  public convert(options: ConvertOptions): Image {
    const { format, lossless, path, progressive, quality } = options;

    const image = file(path).image();

    return this.encoders[format].encode(image, {
      lossless,
      progressive,
      quality,
    });
  }
}
