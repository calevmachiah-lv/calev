import { isRightToLeft } from '../../utils/function/functions';
import { PopUpPosition } from './PopUpType';

export const popUpPosition = (width: number, height: number): PopUpPosition => {
  return isRightToLeft()
    ? width < height
      ? { vertical: 'top', horizontal: 'right' }
      : { vertical: 'bottom', horizontal: 'right' }
    : width < height
      ? { vertical: 'top', horizontal: 'left' }
      : { vertical: 'bottom', horizontal: 'left' };
};
