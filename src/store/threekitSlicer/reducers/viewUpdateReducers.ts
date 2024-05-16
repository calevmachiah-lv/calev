import { PayloadAction } from "@reduxjs/toolkit";
import { ThreekitState } from "..";

export const viewUpdateReducers = {
  setViewUpdate( state: ThreekitState,
    action: PayloadAction<ThreekitState['viewUpdate']>) {
    state.viewUpdate = action.payload;
  },
};
