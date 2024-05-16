import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { IGlobalSettingsState } from '..';

export const getGlobalSettings: (state: stateRoot) => IGlobalSettingsState =
  memoizeOne((state) => state);

export const getGlobalSettingsParams: (
  state: stateRoot
) => IGlobalSettingsState['params'] = memoizeOne(
  (state) => state.globalSettings.params
);

export const getStep: (state: stateRoot) => IGlobalSettingsState['step'] =
  memoizeOne((state) => {
    return parseInt(state.globalSettings.step?.toString(), 10);
  });
