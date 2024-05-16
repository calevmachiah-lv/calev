import { Dispatch } from 'react';
import {
  setAttributes,
  setForm,
  setLanguageState,
  setMetadata,
  setProduct,
  setThreekitLoaded,
} from '..';
import { setConfiguration } from './configurationReducers';
import Controller from '../../../controller';
import { DEFAULT_PLAYER_CONFIG } from '../../../utils/constants';

interface LaunchConfig {
  orgId: string;
  threekitEnv: string;
  serverUrl: string;
  language?: string;
  additionalTools?: any;
  threekitProductEnv: string;
  authProductToken: string;
  isChina?: boolean;
  compression?: boolean;
  isLocalHost?: boolean;
  productInfos: any;
  [key: string]: any;
}

export const launch =
  (config: LaunchConfig) => async (dispatch: Dispatch<any>) => {

    const launchConfig = Object.assign(
      {},
      DEFAULT_PLAYER_CONFIG,
      Object.keys(DEFAULT_PLAYER_CONFIG).reduce((output, key) => {
        if (config[key] === undefined) return output;
        return Object.assign(output, { [key]: config[key] });
      }, {}),
      {
        orgId: config.orgId,
        threekitEnv: config.threekitEnv,
        serverUrl: config.serverUrl,
        language: config.language,
        additionalTools: config.additionalTools,
        threekitProductEnv: config.threekitProductEnv,
        authProductToken: config.authProductToken,
        isChina: config.isChina,
        compression: config.compression,
        productInfos: config.productInfos,
      }
    );
    await Controller.launch(launchConfig);

    dispatch(setThreekitLoaded(true));
    dispatch(setProduct(window.threekit.controller.getProduct()));
    dispatch(setForm(window.threekit.controller.getForm(config)));
    dispatch(setMetadata(window.threekit.configurator.getMetadata()));

    dispatch(setConfiguration(window.threekit.configurator.getConfiguration()));

    if (config.language) {
      return dispatch(setLanguageState(config.language));
    }

    dispatch(setAttributes(window.threekit.controller.getAttributes()));
  };
