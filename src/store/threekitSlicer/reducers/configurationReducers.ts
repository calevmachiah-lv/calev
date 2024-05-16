import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { stateRoot } from '../../index';
import {
  ConfigurationState,
  IAttribute,
  ThreekitState,
  setAttributes,
  setForm,
  setGroupedAttributes,
} from '..';
import { getMergedAttributesAndGrouped } from '../../../utils/function/functions';

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
  [key: string]: any;
}

export const configurationReducers = {
  setProduct: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['product']>
  ) => {
    state.configuration.product = action.payload;
  },
  setInitialConfiguration: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['initialConfiguration']>
  ) => {
    state.configuration.initialConfiguration = action.payload;
  },
  setValidAttributes: (
    state: ThreekitState,
    action: PayloadAction<
      ConfigurationState['formValidAttributes']['validAttributes']
    >
  ) => {
    state.configuration.dataDrivenConfiguratorExtensionStatus.validAttributes =
      action.payload;
  },
  setSku: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['formValidAttributes']['sku']>
  ) => {
    state.configuration.dataDrivenConfiguratorExtensionStatus.sku =
      action.payload;
  },
  setFormValidAttributes: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['formValidAttributes']>
  ) => {
    state.configuration.formValidAttributes = action.payload;
  },
  setName: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['name']>
  ) => {
    state.configuration.name = action.payload;
  },
  setActiveAttribute: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['activeAttribute'] | IAttribute>
  ) => {
    state.configuration.activeAttribute =
      typeof action.payload === 'string'
        ? action.payload
        : action.payload?.name;
  },
  setDependencies: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['dependencies']>
  ) => {
    state.configuration.dependencies = action.payload;
  },
  setForm: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['form']>
  ) => {
    state.configuration.form = action.payload;
  },
  setGroupedAttributes: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['groupedAttributes']>
  ) => {
    state.configuration.groupedAttributes = action.payload;
  },
  setIsInStock: (
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['isInStock']>
  ) => {
    state.configuration.isInStock = action.payload;
  },
  setMetadata(
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['metadata']>
  ) {
    state.configuration.metadata = action.payload;
  },
  setAttributes(
    state: ThreekitState,
    action: PayloadAction<ConfigurationState['attributes']>
  ) {
    const newAttributes = Object.assign(
      {},
      state.configuration.attributes,
      action.payload
    );
    state.configuration.attributes = { ...newAttributes };
  },
};

const setDataDrivenFewConfiguration = async (
  attributes: Record<string, any>
) => {
  for (const [key, value] of Object.entries(attributes)) {
    await window.dataDrivenConfigurator.setConfiguration({
      [key]: value,
    });
  }
};

export const setConfiguration = createAsyncThunk(
  'threekit/setConfiguration',
  async (config: LaunchConfig | any, { dispatch }) => {
    const preppedConfig = config || {};

    if (Object.keys(preppedConfig).length === 1) {
      await window.dataDrivenConfigurator.setConfiguration(preppedConfig);
    } else {
      await setDataDrivenFewConfiguration(preppedConfig);
    }

    const updatedAttributes = await window.threekit.controller.getAttributes();
    const [
      mergedAttributesWithDataDriven,
      mergedAttributesWithDataDrivenGrouped,
    ] = getMergedAttributesAndGrouped(updatedAttributes) as [
      Record<string, IAttribute>,
      Record<string, IAttribute[]>,
    ];

    // const groupedAttributes = await groupAttributes(updatedAttributes);

    dispatch(setGroupedAttributes(mergedAttributesWithDataDrivenGrouped));
    dispatch(setForm(window.threekit.controller.getForm(preppedConfig)));
    dispatch(setAttributes(mergedAttributesWithDataDriven));
    // dispatch(setPlayerLoading(false));
  }
);

export const updateModelPresentationOnDataDriven =
  () => async (dispatch: any, getState: () => stateRoot) => {
    const { threekit } = getState();
    const currentModelPresentation =
      threekit?.configuration?.attributes?.['Model Presentation']?.value;
    await window.dataDrivenConfigurator.setConfiguration({
      'Model Presentation': currentModelPresentation,
    });
  };
