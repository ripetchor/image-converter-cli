import { argv } from 'bun';
import { parseArgs, type ParseArgsOptionsConfig } from 'node:util';

import type { ExecuteOptions } from './types';

import { assertImageFormat, assertSourceDir } from './helpers';

const options = {
  format: { default: 'webp', type: 'string' },
  lossless: { default: false, type: 'boolean' },
  outputDir: { default: '', type: 'string' },
  progressive: { default: false, type: 'boolean' },
  quality: { default: '80', type: 'string' },
  recursive: { default: false, type: 'boolean' },
  sourceDir: { type: 'string' },
} satisfies ParseArgsOptionsConfig;

export function parseCliOptions(): ExecuteOptions {
  const { values } = parseArgs({ args: argv.slice(2), options });

  assertSourceDir(values.sourceDir);
  assertImageFormat(values.format);

  return {
    format: values.format,
    lossless: values.lossless,
    outputDir: values.outputDir,
    progressive: values.progressive,
    quality: Number.parseInt(values.quality),
    recursive: values.recursive,
    sourceDir: values.sourceDir,
  };
}
