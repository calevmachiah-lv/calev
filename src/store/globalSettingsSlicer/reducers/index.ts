import { PayloadAction } from '@reduxjs/toolkit';
import { IGlobalSettingsState } from '..';
import { TK_SAVED_CONFIG_PARAM_KEY } from '../../../utils/constants';

export const setGlobalSettings = (
  state: IGlobalSettingsState,
  action: PayloadAction<IGlobalSettingsState>
) => {
  return action.payload;
};
export interface IParams {
  token?: string;
  tokenjwt?: string;
  sku?: string;
  appName?: string;
  timestamp?: string;
  storeCode?: string;
  configId?: string;
  lng?: string;
  country?: string;
  productName?: string;
  recipeId?: string;
  price?: string;
  step?: number;
  notistack?: boolean;
  [TK_SAVED_CONFIG_PARAM_KEY]?: string;
}

export const setGlobalSettingsParams = (
  state: IGlobalSettingsState,
  action: PayloadAction<IParams>
) => {
  state.params = action.payload;
  state.params.token = action.payload.token
    ? encodeURIComponent(action.payload.token)
    : '';
};

export const setStep = (
  state: IGlobalSettingsState,
  action: PayloadAction<number>
) => {
  state.step = action.payload;
};
