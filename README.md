# Crop Tools

> Tools for calculating image crops.

[![npm module](https://badge.fury.io/js/crop-tools.svg)](https://www.npmjs.org/package/crop-tools)
[![Coverage Status](https://coveralls.io/repos/github/christianhg/crop-tools/badge.svg?branch=master)](https://coveralls.io/github/christianhg/crop-tools?branch=master)
[![Build Status](https://travis-ci.org/christianhg/crop-tools.svg?branch=master)](https://travis-ci.org/christianhg/crop-tools)
[![Dependencies](https://david-dm.org/christianhg/crop-tools.svg)](https://david-dm.org/christianhg/crop-tools)
[![devDependencies Status](https://david-dm.org/christianhg/crop-tools/dev-status.svg)](https://david-dm.org/christianhg/crop-tools?type=dev)

```js
import { calculateCrop, scaleCrop } from 'crop-tools';

const crop = calculateCrop({
  imageDimensions: {
    width: 1280,
    height: 720,
  },
  cropDimensions: {
    width: 300,
    height: 400,
  },
});
// => { width: 540, height: 720, left: 370, top: 0 }

const cropUsingPOI = calculateCrop({
  imageDimensions: {
    width: 1280,
    height: 720,
  },
  cropDimensions: {
    width: 300,
    height: 400,
  },
  poi: {
    x: 25,
    y: 25,
  },
});
// => { width: 540, height: 720, left: 0, top: 0 }

const scaledCrop = scaleCrop({
  imageDimensions: {
    original: {
      width: 1280,
      height: 720,
    },
    current: {
      width: 320,
      height: 180,
    },
  },
  crop,
});
// => { width: 135, height: 180, left: 92.5, top: 0 }
```
