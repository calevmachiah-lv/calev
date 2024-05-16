import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, ThreekitState } from '..';
import { useDispatch } from 'react-redux';

export const settingsReducers = {
  setThreekitLoaded: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['isThreekitLoaded']>
  ) => {
    state.settings.isThreekitLoaded = action.payload;
  },
  setPlayerLoading: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['isPlayerLoading']>
  ) => {
    state.settings.isPlayerLoading = action.payload;
  },
  setLanguageState: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['language']>
  ) => {
    state.settings.language = action.payload;
  },
  setIsChina: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['isChina']>
  ) => {
    state.settings.isChina = action.payload;
  },
  setPlayerSize: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['playerSize']>
  ) => {
    state.settings.playerSize = action.payload;
  },
  setNotInStockUnselected: (
    state: ThreekitState,
    action: PayloadAction<SettingsState['notInStockUnselected']>
  ) => {
    state.settings.notInStockUnselected = action.payload;
  },
};

export const setLanguage =
  (language: SettingsState['language']) =>
    async (dispatch: any = useDispatch()) => {
      if (!language) return;
      const payloadAction: PayloadAction<SettingsState['language']> = {
        type: 'settings/setLanguageState',
        payload: language,
      };
      dispatch(payloadAction);
    };
