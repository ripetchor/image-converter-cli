import type { Dirent } from "node:fs";

import { basename, extname, relative, resolve } from "node:path";

import type { ImageFormat } from "./types";

import { IMAGE_FORMATS } from "./constants";

export function assertImageFormat(
  value: unknown,
): asserts value is ImageFormat {
  if (typeof value !== "string") {
    throw new TypeError("--format must be a string");
  }

  if (!isImageFormat(value)) {
    throw new Error(`
      Unsupported format: ${value}
      Supported formats: jpeg, png, webp, heic, avif
      `);
  }
}

export function isImage(dirent: Dirent): boolean {
  return dirent.isFile() && IMAGE_FORMATS.has(extname(dirent.name));
}

export function isImageFormat(value: unknown): value is ImageFormat {
  return (
    value === "webp" ||
    value === "jpeg" ||
    value === "png" ||
    value === "heic" ||
    value === "avif"
  );
}

export function resolveImageDestination(options: {
  format: string;
  name: string;
  outputDir?: string;
  parentPath: string;
  sourceDir: string;
}): string {
  const { format, name, outputDir, parentPath, sourceDir } = options;

  const destinationDir = outputDir
    ? resolve(outputDir, relative(sourceDir, parentPath))
    : parentPath;

  const fileName = basename(name, extname(name));

  return resolve(destinationDir, `${fileName}.${format}`);
}
