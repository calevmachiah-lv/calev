import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { ProductPageState } from '..';


export const getPlaceHolderError: (
  state: stateRoot
) => ProductPageState['placeHolderError'] = memoizeOne(
  (state) => state?.threekit?.productPage?.placeHolderError
);

export const getPage: (state: stateRoot) => ProductPageState['page'] =
  memoizeOne((state) => state?.threekit?.productPage?.page);

export const getPlayer3DImage: (
  state: stateRoot
) => ProductPageState['player3DImage'] = memoizeOne(
  (state) => state?.threekit?.productPage?.player3DImage
);

export const getIsFullScreen: (
  state: stateRoot
) => ProductPageState['isFullScreen'] = memoizeOne(
  (state) => state?.threekit?.productPage?.isFullScreen
);

export const getHasPatch: (state: stateRoot) => ProductPageState['hasPatch'] =
  memoizeOne((state) => state?.threekit?.productPage?.hasPatch);

export const getPreviousCamera: (
  state: stateRoot
) => ProductPageState['previousCamera'] = memoizeOne(
  (state) => state?.threekit?.productPage?.previousCamera
);

export const getLastAngle: (state: stateRoot) => ProductPageState['lastAngle'] =
  memoizeOne((state) => state?.threekit?.productPage?.lastAngle);
