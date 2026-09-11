import type { Dirent } from 'node:fs';

import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import type { ImageConverter } from './image-converter';
import type { AppConvertOptions, ExecuteOptions, OnConvertedCallback } from './types';

import { isImage, resolveImageDestination } from './helpers';

export class App {
  private readonly converter: ImageConverter;

  public constructor(converter: ImageConverter) {
    this.converter = converter;
  }

  public async execute(
    getOptions: () => ExecuteOptions,
    onConverted?: OnConvertedCallback
  ): Promise<void> {
    const options = getOptions();

    const dir = await readdir(options.sourceDir, {
      recursive: options.recursive,
      withFileTypes: true,
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
    const { format, lossless, name, outputDir, parentPath, progressive, quality, sourceDir } =
      options;

    const destination = resolveImageDestination({ format, name, outputDir, parentPath, sourceDir });

    const converted = this.converter.convert({
      format,
      lossless,
      path: resolve(parentPath, name),
      progressive,
      quality,
    });

    const bytes = await converted.write(destination);

    onConverted?.({ bytes, destination });
  }

  private createConvertOptions(dirent: Dirent, options: ExecuteOptions): AppConvertOptions {
    return {
      format: options.format,
      lossless: options.lossless,
      name: dirent.name,
      outputDir: options.outputDir,
      parentPath: dirent.parentPath,
      progressive: options.progressive,
      quality: options.quality,
      sourceDir: options.sourceDir,
    };
  }
}
