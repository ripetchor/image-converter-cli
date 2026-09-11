import type { OnConvertedCallback } from "./types";

import { App } from "./app";
import { parseCliOptions } from "./cli";
import { ENCODERS } from "./constants";
import { ImageConverter } from "./image-converter";

const onConverted: OnConvertedCallback = ({ bytes, destination }) => {
  console.log(
    "Successfully converted:",
    destination,
    `(${(bytes / 1000).toFixed(2)} KB)`,
  );
};

const app = new App(new ImageConverter(ENCODERS));

app.execute(parseCliOptions, onConverted).catch(console.error);
