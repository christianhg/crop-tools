import { Box, Coordinates, Position, placeBox } from 'place-box';
import { fitBox } from 'fit-box';

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
