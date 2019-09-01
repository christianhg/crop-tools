import { calculateCrop } from '../src';
import { createBoxGenerator } from 'box-generator';
import { randomNumber } from './random-number';
import { aspectRatio } from './aspect-ratio';
import { contains } from './contains';
import { equalFloats } from './equal-floats';

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
        const cropA = calculateCrop({
          imageDimensions,
          poi,
          cropDimensions,
        });
        const cropB = calculateCrop({ imageDimensions, cropDimensions });

        expect(
          equalFloats(aspectRatio(cropA), aspectRatio(cropDimensions))
        ).toBeTruthy();
        expect(
          equalFloats(aspectRatio(cropB), aspectRatio(cropDimensions))
        ).toBeTruthy();

        expect(
          contains({ boundary: imageDimensions, box: cropA })
        ).toBeTruthy();
        expect(
          contains({ boundary: imageDimensions, box: cropB })
        ).toBeTruthy();

        expect(cropA.left === 0 || cropA.top === 0).toBeTruthy();
        expect(cropB.left === 0 || cropB.top === 0).toBeTruthy();
      }
    }
  });
});
