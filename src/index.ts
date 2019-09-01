import { fitBox } from 'fit-box';
import { Box, Coordinates, placeBox, Position } from 'place-box';

export type Dimensions = Box;

export type Crop = Dimensions & Position;

export type POI = Coordinates;

export function calculateCrop({
  imageDimensions: boundary,
  poi: coordinates = { x: boundary.width / 2, y: boundary.height / 2 },
  cropDimensions: box,
}: {
  imageDimensions: Dimensions;
  poi?: POI;
  cropDimensions: Dimensions;
}): Crop {
  const fittedBox = fitBox({ boundary, box });
  const position = placeBox({ boundary, coordinates, box: fittedBox });

  return {
    ...fittedBox,
    ...position,
  };
}

export function scaleCrop({
  imageDimensions,
  crop,
}: {
  imageDimensions: {
    original: Dimensions;
    current: Dimensions;
  };
  crop: Crop;
}): Crop {
  const scale = imageDimensions.current.width / imageDimensions.original.width;

  return {
    width: crop.width * scale,
    height: crop.height * scale,
    left: crop.left * scale,
    top: crop.top * scale,
  };
}
