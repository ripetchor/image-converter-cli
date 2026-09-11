# Image Converter

A CLI tool for converting images using Bun.

## Installation

```bash
git clone https://github.com/ripetchor/image-converter-cli.git
```

```bash
cd image-converter-cli
```

```bash
bun install
```

## Arguments

- `--sourceDir` (required)
- `--outputDir` (optional, default: `--sourceDir`)
- `--recursive` (optional, default: `false`)
- `--format` (optional, default: `webp`)
- `--quality` (optional, default: `80`)
- `--lossless` (optional, default: `false`, for `webp`)
- `--progressive` (optional, default: `false`, for `jpeg`)

## Usage

```bash
bun run convert --sourceDir <source-directory-path>
```

### Examples

Convert to PNG:

```bash
bun run convert --sourceDir <source-directory-path> --format png
```

Set quality:

```bash
bun run convert --sourceDir <source-directory-path> --format webp --quality 90
```

Set output directory:

```bash
bun run convert --sourceDir <source-directory-path> --outputDir <output-directory-path>
```

Lossless WebP:

```bash
bun run convert --sourceDir <source-directory-path> --format webp --lossless
```

Progressive JPEG:

```bash
bun run convert --sourceDir <source-directory-path> --format jpeg --progressive
```
