import { calculateCrop } from '../src';
import { createBoxGenerator } from 'box-generator';
import { randomNumber } from './random-number';
import { aspectRatio } from './aspect-ratio';
import { contains } from './contains';

describe(calculateCrop.name, () => {
  it('works', () => {
    const images = createBoxGenerator({
      initial: {
        width: randomNumber({ from: 1, to: 1000 }),
        height: randomNumber({ from: 1, to: 1000 }),
      },
    });

    for (let imageDimensions of images) {
      const crops = createBoxGenerator({ initial: imageDimensions });

      for (let cropDimensions of crops) {
        const poi = {
          x: randomNumber({ from: 0, to: imageDimensions.width }),
          y: randomNumber({ from: 0, to: imageDimensions.height }),
        };
        const crop = calculateCrop({ imageDimensions, poi, cropDimensions });

        expect(aspectRatio(crop).toFixed(2)).toBe(
          aspectRatio(cropDimensions).toFixed(2)
        );

        expect(contains({ boundary: imageDimensions, box: crop })).toBeTruthy();

        expect(crop.left === 0 || crop.top === 0).toBeTruthy();
      }
    }
  });
});
