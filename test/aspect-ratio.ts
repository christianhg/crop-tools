import { Box } from 'fit-box';

export function aspectRatio(box: Box): number {
  return box.width / box.height;
}
