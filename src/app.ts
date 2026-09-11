import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { isImage, resolveImageDestination } from './helpers';
import type { ImageConverter } from './image-converter';
import type { AppConvertOptions, ExecuteOptions, OnConvertedCallback } from './types';

export class App {
  private readonly converter: ImageConverter;

  constructor(converter: ImageConverter) {
    this.converter = converter;
  }

  public async execute(
    getOptions: () => ExecuteOptions,
    onConverted?: OnConvertedCallback
  ): Promise<void> {
    const options = getOptions();

    const dir = await readdir(options.sourceDir, {
      withFileTypes: true,
      recursive: options.recursive,
    });

    const images = dir.filter(isImage);

    await Promise.all(
      images.map((dirent) => {
        return this.convert(this.createConvertOptions(dirent, options), onConverted);
      })
    );
  }

  private async convert(
    options: AppConvertOptions,
    onConverted?: OnConvertedCallback
  ): Promise<void> {
    const { sourceDir, outputDir, parentPath, name, format, quality, lossless, progressive } =
      options;

    const destination = resolveImageDestination({ sourceDir, outputDir, parentPath, name, format });

    const converted = this.converter.convert({
      path: resolve(parentPath, name),
      format,
      quality,
      lossless,
      progressive,
    });

    const bytes = await converted.write(destination);

    onConverted?.({ destination, bytes });
  }

  private createConvertOptions(dirent: Dirent, options: ExecuteOptions): AppConvertOptions {
    return {
      name: dirent.name,
      parentPath: dirent.parentPath,
      sourceDir: options.sourceDir,
      outputDir: options.outputDir,
      format: options.format,
      quality: options.quality,
      lossless: options.lossless,
      progressive: options.progressive,
    };
  }
}
