import { argv } from 'bun';
import { parseArgs, type ParseArgsOptionsConfig } from 'node:util';

import { assertImageFormat } from './helpers';
import type { ExecuteOptions } from './types';

const options: ParseArgsOptionsConfig = {
  sourceDir: { type: 'string' },
  outputDir: { type: 'string', default: '' },
  format: { type: 'string', default: 'webp' },
  quality: { type: 'string', default: '80' },
  lossless: { type: 'boolean', default: false },
  progressive: { type: 'boolean', default: false },
  recursive: { type: 'boolean', default: false },
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
    sourceDir: values.sourceDir,
    outputDir: values.outputDir,
    format: values.format,
    quality: Number.parseInt(values.quality),
    lossless: values.lossless,
    progressive: values.progressive,
    recursive: values.recursive,
  };
}
