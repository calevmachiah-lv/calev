import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { SavedConfigurationData } from '..';

export const getSavedConfigurationData: (
  state: stateRoot
) => SavedConfigurationData = memoizeOne(
  (state) => state.threekit.savedConfigurationData
);
