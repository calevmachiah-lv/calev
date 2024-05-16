import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { ThreekitState } from '..';

export const getCurrentMode: (
  state: stateRoot
) => ThreekitState['currentMode'] = memoizeOne(
  (state) => state?.threekit?.currentMode
);

export const getCurrentModelView: (
  state: stateRoot
) => ThreekitState['modelView'] = memoizeOne(
  (state) => state?.threekit?.modelView
);

export const getViewUpdate: (
  state: stateRoot
) => ThreekitState['viewUpdate'] = memoizeOne(
  (state) => state?.threekit?.viewUpdate
);

