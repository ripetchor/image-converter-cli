import { argv } from 'bun';
import { parseArgs, type ParseArgsOptionsConfig } from 'node:util';
import { convertImages } from './converters';
import { assertImageFormat } from './helpers';

const options: ParseArgsOptionsConfig = {
  sourceDir: {
    type: 'string',
  },
  destinationDir: {
    type: 'string',
    default: '',
  },
  format: {
    type: 'string',
    default: 'webp',
  },
  quality: {
    type: 'string',
    default: '80',
  },
  lossless: {
    type: 'boolean',
    default: false,
  },
  progressive: {
    type: 'boolean',
    default: false,
  },
};

const { values } = parseArgs({ args: argv.slice(2), options });

if (!values.sourceDir) {
  throw new Error('--sourceDir is required');
}

assertImageFormat(values.format);

if (
  typeof values.sourceDir !== 'string' ||
  typeof values.destinationDir !== 'string' ||
  typeof values.quality !== 'string' ||
  typeof values.lossless !== 'boolean' ||
  typeof values.progressive !== 'boolean'
) {
  throw new Error('Invalid argument type');
}

convertImages({
  sourceDir: values.sourceDir,
  destinationDir: values.destinationDir,
  format: values.format,
  quality: parseInt(values.quality),
  lossless: values.lossless,
  progressive: values.progressive,
}).catch(console.error);
