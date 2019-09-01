import { calculateCrop, scaleCrop, Dimensions } from '../src';
import { createBoxGenerator } from 'box-generator';
import { randomNumber } from './random-number';
import { aspectRatio } from './aspect-ratio';
import { contains } from './contains';
import { equalFloats } from './equal-floats';

describe(`${calculateCrop.name} and ${scaleCrop.name}`, () => {
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

        const { up: imageScaledUp, down: imageScaledDown } = scaleImage(
          imageDimensions
        );

        const cropAScaledUp = scaleCrop({
          imageDimensions: {
            original: imageDimensions,
            current: imageScaledUp,
          },
          crop: cropA,
        });
        const cropAScaledDown = scaleCrop({
          imageDimensions: {
            original: imageDimensions,
            current: imageScaledDown,
          },
          crop: cropA,
        });
        const cropBScaledUp = scaleCrop({
          imageDimensions: {
            original: imageDimensions,
            current: imageScaledUp,
          },
          crop: cropB,
        });
        const cropBScaledDown = scaleCrop({
          imageDimensions: {
            original: imageDimensions,
            current: imageScaledDown,
          },
          crop: cropB,
        });

        expect(
          equalFloats(aspectRatio(cropA), aspectRatio(cropAScaledUp))
        ).toBeTruthy();
        expect(
          equalFloats(aspectRatio(cropA), aspectRatio(cropAScaledDown))
        ).toBeTruthy();
        expect(
          equalFloats(aspectRatio(cropB), aspectRatio(cropBScaledUp))
        ).toBeTruthy();
        expect(
          equalFloats(aspectRatio(cropB), aspectRatio(cropBScaledDown))
        ).toBeTruthy();
      }
    }
  });
});

function scaleImage(
  image: Dimensions
): {
  up: Dimensions;
  down: Dimensions;
} {
  if (image.height > image.width) {
    const heightUp = randomNumber({
      from: image.height + 1,
      to: image.height * 5,
    });
    const heightDown = randomNumber({ from: 1, to: image.height - 1 });

    return {
      up: {
        width: (heightUp / image.height) * image.width,
        height: heightUp,
      },
      down: {
        width: (heightDown / image.height) * image.width,
        height: heightDown,
      },
    };
  }

  const widthUp = randomNumber({ from: image.width + 1, to: image.width * 5 });
  const widthDown = randomNumber({ from: 1, to: image.width - 1 });

  return {
    up: {
      width: widthUp,
      height: (widthUp / image.width) * image.height,
    },
    down: {
      width: widthDown,
      height: (widthDown / image.width) * image.height,
    },
  };
}
