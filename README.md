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

## Usage

```bash
bun run convert --sourceDir <source-directory-path>
```

Defaults:

- Format: `webp`
- Quality: `80`
- Lossless: `false`
- Progressive: `false`

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
