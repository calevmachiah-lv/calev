import { createSlice } from '@reduxjs/toolkit';
import * as configurationReducers from './reducers';

interface PlayerSize {
  width: number;
  height: number;
}

interface DataDrivenConfiguratorExtensionStatus {
  validAttributes: string[];
  sku: string;
}

export interface SettingsState {
  isThreekitLoaded: boolean;
  isPlayerLoading: boolean;
  language?: string;
  isChina?: boolean;
  playerSize: PlayerSize;
  notInStockUnselected: boolean;
}
export interface IAttribute {
  name: string;
  [key: string]: any;
}
export interface IForm {
  [key: string]: {
    [key: string]: IAttribute;
  };
}

export interface ConfigurationState {
  product?: Record<string, any>;
  initialConfiguration?: Record<string, any>;
  form?: IForm;
  groupedAttributes?: Record<string, IAttribute[]>;
  attributes?: Record<string, any>;
  isInStock?: Record<string, any>;
  dataDrivenConfiguratorExtensionStatus: DataDrivenConfiguratorExtensionStatus;
  formValidAttributes: Record<string, any>;
  metadata?: Record<string, any>;
  name?: string;
  activeAttribute?: string;
  dependencies?: any;
}

export interface ProductPageState {
  placeHolderError: boolean;
  page: string;
  playerFullScreen: boolean;
  hasPatch: boolean;
  isFullScreen: boolean;
  player3DImage: string;
  previousCamera: string;
  lastAngle: number;
}

export interface SavedConfigurationData {
  id: string;
  productId: string;
  productVersion: string;
  variant: Record<string, any>;
  metadata: Record<string, any>;
  createdAt: string;
  shortId: string;
  orgId: string;
  thumbnail: string;
  customerId: string;
  scope: string;
  identifier: string;
  attachments: Record<string, any>;
  sceneGraphState: Record<string, any>;
  resumableUrl: string;
  thumbnailUrls: string[];
  inStore?: boolean;
}

export interface ThreekitState {
  settings: SettingsState;
  configuration: ConfigurationState;
  currentMode: string;
  viewUpdate: boolean;

  productPage: ProductPageState;
  savedConfigurationData: SavedConfigurationData;
  player?: any;
  modelView: string;
}

const initialState: ThreekitState = {
  settings: {
    isThreekitLoaded: false,
    isPlayerLoading: false,
    language: undefined,
    isChina: undefined,
    playerSize: { width: 0, height: 0 },
    notInStockUnselected: false,
  },
  configuration: {
    product: undefined,
    initialConfiguration: undefined,
    form: undefined,
    groupedAttributes: undefined,
    attributes: undefined,
    isInStock: undefined,
    dataDrivenConfiguratorExtensionStatus: { validAttributes: [], sku: '' },
    formValidAttributes: {},
    metadata: undefined,
  },
  currentMode: '2D',
  viewUpdate: false,
  modelView: 'Closed',
  productPage: {
    placeHolderError: false,
    page: 'home',
    playerFullScreen: false,
    previousCamera: '',
    lastAngle: 0,
    player3DImage: '',
    hasPatch: false,
    isFullScreen: false,
  },
  savedConfigurationData: {
    id: '',
    productId: '',
    productVersion: '',
    variant: {},
    metadata: {},
    createdAt: '',
    shortId: '',
    orgId: '',
    thumbnail: '',
    customerId: '',
    scope: '',
    identifier: '',
    attachments: {},
    sceneGraphState: {},
    resumableUrl: '',
    thumbnailUrls: [],
  },
  player: undefined,
};

export const threekitSlice = createSlice({
  name: 'threekit',
  initialState,
  reducers: {
    ...configurationReducers.configurationReducers,
    ...configurationReducers.currentModeReducers,
    ...configurationReducers.productPageReducers,
    ...configurationReducers.settingsReducers,
    ...configurationReducers.savedConfigurationDataReducers
  },
});

export const {
  setInitialConfiguration,
  setThreekitLoaded,
  setPlayerLoading,
  setIsChina,
  setLanguageState,
  setNotInStockUnselected,
  setProduct,
  setForm,
  setGroupedAttributes,
  setIsInStock,
  setAttributes,
  setValidAttributes,
  setSku,
  setFormValidAttributes,
  setMetadata,
  setPlayerSize,
  setCurrentMode,
  setCurrentModelView,
  setIsFullScreen,
  setViewUpdate,
  setPage,
  setLastAngle,
  setSavedConfigurationData,
  setActiveAttribute
} = threekitSlice.actions;

export default threekitSlice.reducer;

export * from './reducers';
export * from './selectors';
