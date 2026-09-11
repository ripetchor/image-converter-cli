import { argv } from 'bun';
import { parseArgs, type ParseArgsOptionsConfig } from 'node:util';

import type { ExecuteOptions } from './types';

import { assertImageFormat } from './helpers';

const options: ParseArgsOptionsConfig = {
  format: { default: 'webp', type: 'string' },
  lossless: { default: false, type: 'boolean' },
  outputDir: { default: '', type: 'string' },
  progressive: { default: false, type: 'boolean' },
  quality: { default: '80', type: 'string' },
  recursive: { default: false, type: 'boolean' },
  sourceDir: { type: 'string' },
};

export function parseCliOptions(): ExecuteOptions {
  const { values } = parseArgs({ args: argv.slice(2), options });

  if (!values.sourceDir) {
    throw new Error('--sourceDir is required');
  }

  assertImageFormat(values.format);

  if (
    typeof values.sourceDir !== 'string' ||
    typeof values.outputDir !== 'string' ||
    typeof values.quality !== 'string' ||
    typeof values.lossless !== 'boolean' ||
    typeof values.progressive !== 'boolean' ||
    typeof values.recursive !== 'boolean'
  ) {
    throw new Error('Invalid argument type');
  }

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
