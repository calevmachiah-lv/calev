"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActiveAttribute = exports.setSavedConfigurationData = exports.setLastAngle = exports.setPage = exports.setViewUpdate = exports.setIsFullScreen = exports.setCurrentModelView = exports.setCurrentMode = exports.setPlayerSize = exports.setMetadata = exports.setFormValidAttributes = exports.setSku = exports.setValidAttributes = exports.setAttributes = exports.setIsInStock = exports.setGroupedAttributes = exports.setForm = exports.setProduct = exports.setNotInStockUnselected = exports.setLanguageState = exports.setIsChina = exports.setPlayerLoading = exports.setThreekitLoaded = exports.setInitialConfiguration = exports.threekitSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const configurationReducers = __importStar(require("./reducers"));
const initialState = {
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
exports.threekitSlice = (0, toolkit_1.createSlice)({
    name: 'threekit',
    initialState,
    reducers: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, configurationReducers.configurationReducers), configurationReducers.currentModeReducers), configurationReducers.productPageReducers), configurationReducers.settingsReducers), configurationReducers.savedConfigurationDataReducers),
});
_a = exports.threekitSlice.actions, exports.setInitialConfiguration = _a.setInitialConfiguration, exports.setThreekitLoaded = _a.setThreekitLoaded, exports.setPlayerLoading = _a.setPlayerLoading, exports.setIsChina = _a.setIsChina, exports.setLanguageState = _a.setLanguageState, exports.setNotInStockUnselected = _a.setNotInStockUnselected, exports.setProduct = _a.setProduct, exports.setForm = _a.setForm, exports.setGroupedAttributes = _a.setGroupedAttributes, exports.setIsInStock = _a.setIsInStock, exports.setAttributes = _a.setAttributes, exports.setValidAttributes = _a.setValidAttributes, exports.setSku = _a.setSku, exports.setFormValidAttributes = _a.setFormValidAttributes, exports.setMetadata = _a.setMetadata, exports.setPlayerSize = _a.setPlayerSize, exports.setCurrentMode = _a.setCurrentMode, exports.setCurrentModelView = _a.setCurrentModelView, exports.setIsFullScreen = _a.setIsFullScreen, exports.setViewUpdate = _a.setViewUpdate, exports.setPage = _a.setPage, exports.setLastAngle = _a.setLastAngle, exports.setSavedConfigurationData = _a.setSavedConfigurationData, exports.setActiveAttribute = _a.setActiveAttribute;
exports.default = exports.threekitSlice.reducer;
__exportStar(require("./reducers"), exports);
__exportStar(require("./selectors"), exports);
