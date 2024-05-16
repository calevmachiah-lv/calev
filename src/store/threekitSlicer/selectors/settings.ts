import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { SettingsState } from '..';

export const getIsChina: (state: stateRoot) => SettingsState['isChina'] =
  memoizeOne((state) => state?.threekit?.settings?.isChina);

export const getPlayerSize: (state: stateRoot) => SettingsState['playerSize'] =
  memoizeOne((state) => state?.threekit?.settings?.playerSize);

export const isThreekitLoaded: (
  state: stateRoot
) => SettingsState['isThreekitLoaded'] = memoizeOne(
  (state) => state?.threekit?.settings?.isThreekitLoaded
);

export const isPlayerLoading: (
  state: stateRoot
) => SettingsState['isPlayerLoading'] = memoizeOne(
  (state) => state?.threekit?.settings?.isPlayerLoading
);

export const getNotInStockUnselected: (
  state: stateRoot
) => SettingsState['notInStockUnselected'] = memoizeOne(
  (state) => state?.threekit?.settings?.notInStockUnselected
);