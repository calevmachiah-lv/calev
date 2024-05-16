import { ProductPageState, ThreekitState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

export const productPageReducers = {

  setLastAngle(
    state: ThreekitState,
    action: PayloadAction<ProductPageState['lastAngle']>
  ) {
    if (state.productPage.lastAngle !== action.payload) {
      state.productPage.lastAngle = action.payload;
    }
  },

  setIsFullScreen(
    state: ThreekitState,
    action: PayloadAction<ProductPageState['isFullScreen']>
  ) {
    if (state.productPage.isFullScreen !== action.payload) {
      state.productPage.isFullScreen = action.payload;
    }
  },

  setPage(
    state: ThreekitState,
    action: PayloadAction<ProductPageState['page']>
  ) {
    if (state.productPage.page !== action.payload) {
      state.productPage.page = action.payload;
    }
  },
};
