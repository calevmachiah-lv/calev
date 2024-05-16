import { SavedConfigurationData, ThreekitState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

export const savedConfigurationDataReducers = {
  setSavedConfigurationData(
    state: ThreekitState,
    action: PayloadAction<SavedConfigurationData>
  ) {
    state.savedConfigurationData = action.payload;
  },
};
