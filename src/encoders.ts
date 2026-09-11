import type { Image } from 'bun';

import type { EncodeOptions, ImageEncoder } from './types';

export class WebpEncoder implements ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image {
    return image.webp({ quality: options.quality, lossless: options.lossless });
  }
}

export class JpegEncoder implements ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image {
    return image.jpeg({ quality: options.quality, progressive: options.progressive });
  }
}

export class PngEncoder implements ImageEncoder {
  encode(image: Image): Image {
    return image.png();
  }
}

export class HeicEncoder implements ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image {
    return image.heic({ quality: options.quality });
  }
}

export class AvifEncoder implements ImageEncoder {
  encode(image: Image, options: EncodeOptions): Image {
    return image.avif({ quality: options.quality });
  }
}
