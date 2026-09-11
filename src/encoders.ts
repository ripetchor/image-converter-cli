import type { Image } from 'bun';

import type { EncodeOptions, ImageEncoder } from './types';

export class AvifEncoder implements ImageEncoder {
  public encode(image: Image, options: EncodeOptions): Image {
    return image.avif({ quality: options.quality });
  }
}

export class HeicEncoder implements ImageEncoder {
  public encode(image: Image, options: EncodeOptions): Image {
    return image.heic({ quality: options.quality });
  }
}

export class JpegEncoder implements ImageEncoder {
  public encode(image: Image, options: EncodeOptions): Image {
    return image.jpeg({ progressive: options.progressive, quality: options.quality });
  }
}

export class PngEncoder implements ImageEncoder {
  public encode(image: Image): Image {
    return image.png();
  }
}

export class WebpEncoder implements ImageEncoder {
  public encode(image: Image, options: EncodeOptions): Image {
    return image.webp({ lossless: options.lossless, quality: options.quality });
  }
}
