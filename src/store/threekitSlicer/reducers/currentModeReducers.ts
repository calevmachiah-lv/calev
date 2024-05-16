import { PayloadAction } from '@reduxjs/toolkit';
import { ThreekitState } from '..';

export const currentModeReducers = {
  setCurrentMode(
    state: ThreekitState,
    action: PayloadAction<ThreekitState['currentMode']>
  ) {
    if (state.currentMode !== action.payload) {
      state.currentMode = action.payload;
    }
  },
  setCurrentModelView(
    state: ThreekitState,
    action: PayloadAction<ThreekitState['modelView']>
  ) {
    if (state.modelView !== action.payload) {
      state.modelView = action.payload;
    }
  },
  setViewUpdate(state: ThreekitState,
    action: PayloadAction<ThreekitState['viewUpdate']>) {
    state.viewUpdate = action.payload;
  },
};
