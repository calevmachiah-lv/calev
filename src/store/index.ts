import { configureStore } from '@reduxjs/toolkit';
import globalSettingsReducer from './globalSettingsSlicer';
import threekitReducer from './threekitSlicer';
import validationReducer from './validationSlicer';
import flowReducer, { FlowState } from './flowSlicer';

interface FormState {
  requiredAndChecked: Record<string, any>;
  textInputFields: Record<string, any>;
  warningMessages: Record<string, any>;
}

interface ValidationState {
  validation: {
    form: FormState;
  };
}

export interface RootState {
  validation: ValidationState;
  form: any;
  configuration: {
    product: any;
    initialConfiguration: any;
    form: any;
    attributes: any;
    dataDrivenConfiguratorExtensionStatus: {
      validAttributes: any[];
      sku: string;
    };
    formValidAttributes: any;
    metadata: any;
    price: any;
    name: string;
    activeAttribute: any;
    dependencies: any;
  };
  player: Record<string, any>;
  threekit: Record<string, any>;
  settings: Record<string, any>;
  flow: FlowState;
}

export const store = configureStore({
  reducer: {
    globalSettings: globalSettingsReducer,
    threekit: threekitReducer,
    validation: validationReducer,
    flow: flowReducer,
  },
});

export type stateRoot = ReturnType<typeof store.getState>;
