import { createSlice } from '@reduxjs/toolkit';
import * as globalSettingsReducers from './reducers';

export interface IGlobalSettingsState {
  step: number;
  params: globalSettingsReducers.IParams;
}

const initialState: IGlobalSettingsState = {
  step: -1,
  params: {
    token: '',
    sku: '',
    appName: '',
    storeCode: '',
    timestamp: '',
    configId: '',
    lng: '',
    country: '',
    productName: '',
  },
};

const globalSettingsSlice = createSlice({
  name: 'globalSettings',
  initialState,
  reducers: {
    ...globalSettingsReducers,
  },
});

export const { setGlobalSettings, setGlobalSettingsParams, setStep } =
  globalSettingsSlice.actions;
export default globalSettingsSlice.reducer;

export * from './reducers';
export * from './selectors';
