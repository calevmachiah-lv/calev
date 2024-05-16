"use strict";
/*****************************************************
 * Dev-Kit URL
 ****************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNAVAILABLE_ASSETS_OPACITY_VALUE = exports.AVAILABLE_ASSETS_OPACITY_VALUE = exports.VERTICAL_SIZE_LABEL = exports.BIG_SIZE_LABEL = exports.MEDIUM_SIZE_LABEL = exports.SMALL_SIZE_LABEL = exports.PRICE_PLACEHOLDER = exports.PRODUCTNAME_PLACEHOLDER = exports.DESCRIPTION_PLACEHOLDER = exports.TITLE_PLACEHOLDER = exports.MEASURE_UNIT = exports.RESET_STEP_ACCORDION = exports.RESET_STEP_CAROUSEL = exports.MAIN_ATTACHMENT_KEY = exports.VERSION = exports.ATTRIBUTE_NAME_TO_HIDE = exports.DISPLAY_OPTIONS = exports.DEFAULT_CAMERA_CONFIG = exports.SNAPSHOT_OUTPUTS = exports.SNAPSHOT_FORMATS = exports.METADATA_RESERVED = exports.ARRAY_VALIDATION = exports.SORT_OPTIONS = exports.ATTRIBUTE_TYPES = exports.ATTRIBUTES_RESERVED = exports.DEFAULT_PLAYER_CONFIG = exports.TK_PLAYER_ATTRIBUTE_ID = exports.HOME_CONTAINER = exports.HELPER_DIV_ID = exports.TUTORIAL_DIV_ID = exports.TK_PLAYER_DIV_ID_3D = exports.TK_PLAYER_DIV_ID_2D = exports.SKU_ATTRIBUTE_NAME = exports.TK_SAVED_CONFIG_PARAM_KEY = exports.DISPLAY_CLASS_NAME = exports.TOOL_CLASS_NAME = exports.LAYOUT_CLASS_NAME = exports.WIDGET_CLASS_NAME = exports.INPUT_COMPONENT_CLASS_NAME = exports.CLASS_NAME_PREFIX = exports.DEFAULT_CLASS_NAME = exports.SERVER_API_ROUTE = exports.PRODUCTS_API_ROUTE = exports.ORG_API_ROUTE = exports.ORDERS_API_ROUTE = exports.FILES_API_ROUTE = exports.CATALOG_API_ROUTE = exports.CONFIGURATIONS_API_ROUTE = exports.DATATABLE_API_ROUTE = exports.DEFAULT_SERVER_URL = void 0;
exports.PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE = exports.PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN = exports.PORTRAIT_FORM_MAX_HEIGHT_IN_PX = exports.LANDSCAPE_FORM_MAX_HEIGHT_IN_PX = exports.PORTRAIT_FORM_BASE_HEIGHT_IN_PX = exports.PAGES_TITLES = exports.PLUS_LABEL = exports.MINUS_LABEL = exports.RECIPEID_ERROR_MESSAGE = exports.SKU_ERROR_MESSAGE = exports.LOADING_LABEL = exports.CAROUSSEL_CLASSNAME = exports.NONE_LABEL = exports.PREVIOUS_LABEL = exports.NEXT_LABEL = exports.WISH_BUTTON_LABEL = exports.SHARE_BUTTON_LABEL = exports.EDIT_BUTTON_LABEL = exports.INFO_ZOOM_BUTTON_LABEL = exports.ZOOM_BUTTON_LABEL = exports.LEADTIME_BUTTON_LABEL = exports.MODIFY_BUTTON_LABEL = exports.ADDTOBAG_BUTTON_LABEL = exports.INSTOCK_BUTTON_LABEL = exports.HELPER_BUTTON_LABEL = exports.RESET_BUTTON_LABEL = exports.CLOSE_BUTTON_LABEL = exports.SURPRISE_ME_BUTTON_LABEL = exports.DONE_BUTTON_LABEL = exports.FAKE_SKU = exports.CATALOGDESKTOP_APPNAME = exports.CATALOGWECOM_APPNAME = exports.PATCH_STYLE_LABEL = exports.OOB_APPNAME = void 0;
exports.DEFAULT_SERVER_URL = `https://localhost:5000`;
exports.DATATABLE_API_ROUTE = `/api/datatables`;
exports.CONFIGURATIONS_API_ROUTE = `/api/configurations`;
exports.CATALOG_API_ROUTE = `/api/catalog`;
exports.FILES_API_ROUTE = `/api/files`;
exports.ORDERS_API_ROUTE = '/api/orders';
exports.ORG_API_ROUTE = '/api/orgs';
exports.PRODUCTS_API_ROUTE = `/api/products`;
exports.SERVER_API_ROUTE = '/api';
/*****************************************************
 * Dev-Kit CSS Class
 ****************************************************/
exports.DEFAULT_CLASS_NAME = 'threekit-react';
exports.CLASS_NAME_PREFIX = 'tk';
exports.INPUT_COMPONENT_CLASS_NAME = `${exports.DEFAULT_CLASS_NAME} ${exports.CLASS_NAME_PREFIX}-input`;
exports.WIDGET_CLASS_NAME = `${exports.DEFAULT_CLASS_NAME} ${exports.CLASS_NAME_PREFIX}-widget`;
exports.LAYOUT_CLASS_NAME = `${exports.DEFAULT_CLASS_NAME} ${exports.CLASS_NAME_PREFIX}-layout`;
exports.TOOL_CLASS_NAME = `${exports.DEFAULT_CLASS_NAME} ${exports.CLASS_NAME_PREFIX}-tool`;
exports.DISPLAY_CLASS_NAME = `${exports.DEFAULT_CLASS_NAME} ${exports.CLASS_NAME_PREFIX}-display`;
/*****************************************************
 * Saved Configuration URL Params
 ****************************************************/
exports.TK_SAVED_CONFIG_PARAM_KEY = 'threekitId'; // TODO threekitId
exports.SKU_ATTRIBUTE_NAME = '_SKU';
/*****************************************************
 * Threekit Player initialization Defaults
 ****************************************************/
exports.TK_PLAYER_DIV_ID_2D = 'threekit-player-2d';
exports.TK_PLAYER_DIV_ID_3D = 'threekit-player-3d';
exports.TUTORIAL_DIV_ID = 'tutorial';
exports.HELPER_DIV_ID = 'helper';
exports.HOME_CONTAINER = 'home-container';
exports.TK_PLAYER_ATTRIBUTE_ID = 'b14655f6-a57a-4752-a807-205d14ea82c2';
exports.DEFAULT_PLAYER_CONFIG = {
    authToken: undefined,
    elementId: undefined,
    cache: undefined,
    stageId: undefined,
    assetId: undefined,
    showConfigurator: false,
    initialConfiguration: undefined,
    initialConfigurationId: undefined,
    showLoadingThumbnail: false,
    showLoadingProgress: false,
    onLoadingProgress: undefined,
    showAR: false,
    showShare: false,
    locale: undefined,
    allowMobileVerticalOrbit: false,
    publishStage: undefined,
    attrGroupingTableId: undefined,
    scriptPath: undefined,
    threekitEnv: undefined,
    useProxy: undefined,
    threekitProductEnv: undefined,
    authProductToken: undefined,
};
/*****************************************************
 * Attributes
 ****************************************************/
exports.ATTRIBUTES_RESERVED = {
    step: '_step',
    camera: '_camera',
    dimensions: '_dimensions',
};
exports.ATTRIBUTE_TYPES = {
    asset: 'Asset',
    string: 'String',
    number: 'Number',
    color: 'Color',
    boolean: 'Boolean',
    arraySelector: 'AttributesArraySelector',
    arrayEditor: 'AttributesArrayEditor',
};
exports.SORT_OPTIONS = {
    ascending: 'ascending',
    descending: 'descending',
};
/*****************************************************
 * Psuedo Array Attribute
 ****************************************************/
//  Validation properties for entire array
const arrayValidations = {
    maxItems: 'maxItems',
};
//  Validation properties for each item in the array
const arrayItemValidations = {
    minAllowed: 'minAllowed',
    maxAllowed: 'maxAllowed',
    minProximityToSelf: 'minProximityToSelf',
    maxProximityToSelf: 'maxProximityToSelf',
    minProximityToStart: 'minProximityToStart',
    maxProximityToStart: 'maxProximityToStart',
    minProximityToFinish: 'minProximityToFinish',
    maxProximityToFinish: 'maxProximityToFinish',
    minProximityToEnds: 'minProximityToEnds',
    maxProximityToEnds: 'maxProximityToEnds',
    positionsNotAllowed: 'positionsNotAllowed',
    positionsAllowed: 'positionsAllowed',
};
exports.ARRAY_VALIDATION = Object.assign(arrayValidations, arrayItemValidations);
/*****************************************************
 * Reserved Catalog Item Metadata Properties
 ****************************************************/
exports.METADATA_RESERVED = Object.assign({
    title: '_title',
    description: '_description',
    thumbnailPath: 'thumbnailPath',
    sku: 'SKU',
    valueSku: 'valueSku',
    valueCode: 'valueCode',
    filters: '_filters',
    tooltip: '_tooltip',
    price: '_price',
    translate: '_translate',
    rotate: '_rotate',
    scale: '_scale',
    sortKey: '_order',
    atributeGroupingTableId: '_attrGroupingTableId',
    thumbnail: 'thumbnail',
}, 
//  Array type related metadata
Object.entries(arrayItemValidations).reduce((output, [key, val]) => Object.assign(output, { [key]: `_${val}` }), {}));
/*****************************************************
 * Snapshot
 ****************************************************/
exports.SNAPSHOT_FORMATS = {
    png: 'png',
    jpeg: 'jpeg',
};
exports.SNAPSHOT_OUTPUTS = {
    url: 'url',
    download: 'download',
    dataUrl: 'dataUrl',
    blob: 'blob',
};
exports.DEFAULT_CAMERA_CONFIG = {
    attributeName: 'CameraAngle',
    size: { width: 610, height: 576 },
    format: exports.SNAPSHOT_FORMATS.png,
};
/*****************************************************
 * Additional Display options
 **********************************ffff******************/
exports.DISPLAY_OPTIONS = {
    modal: 'modal',
    drawer: 'drawer',
};
exports.ATTRIBUTE_NAME_TO_HIDE = [
    'CameraAngle',
    'CharacterLimit',
    'Model Presentation',
    'Rotate Model',
    'dataDrivenConfiguratorToolSwitch',
];
exports.VERSION = '1.0.314';
exports.MAIN_ATTACHMENT_KEY = 'Front';
// export const MAIN_ATTACHMENT_KEY = 'Packshot';
exports.RESET_STEP_CAROUSEL = 0;
exports.RESET_STEP_ACCORDION = 0;
exports.MEASURE_UNIT = 'px';
exports.TITLE_PLACEHOLDER = 'Title is missing';
exports.DESCRIPTION_PLACEHOLDER = 'Description is missing';
exports.PRODUCTNAME_PLACEHOLDER = 'Product Name is missing';
exports.PRICE_PLACEHOLDER = 'Price is Missing';
exports.SMALL_SIZE_LABEL = 'small';
exports.MEDIUM_SIZE_LABEL = 'medium';
exports.BIG_SIZE_LABEL = 'big';
exports.VERTICAL_SIZE_LABEL = 'vertical';
exports.AVAILABLE_ASSETS_OPACITY_VALUE = '1';
exports.UNAVAILABLE_ASSETS_OPACITY_VALUE = '0.2';
exports.OOB_APPNAME = 'oob';
exports.PATCH_STYLE_LABEL = 'patch';
exports.CATALOGWECOM_APPNAME = 'catalogwecom';
exports.CATALOGDESKTOP_APPNAME = 'catalogdesktop';
exports.FAKE_SKU = 'N534234';
exports.DONE_BUTTON_LABEL = 'Done';
exports.SURPRISE_ME_BUTTON_LABEL = 'surprise me';
exports.CLOSE_BUTTON_LABEL = 'Close';
exports.RESET_BUTTON_LABEL = 'Reset';
exports.HELPER_BUTTON_LABEL = 'helper';
exports.INSTOCK_BUTTON_LABEL = 'inStock';
exports.ADDTOBAG_BUTTON_LABEL = 'add to bag';
exports.MODIFY_BUTTON_LABEL = 'modify your Lucky Louis';
exports.LEADTIME_BUTTON_LABEL = 'Not orderable';
exports.ZOOM_BUTTON_LABEL = 'zoom';
exports.INFO_ZOOM_BUTTON_LABEL = 'Press and hold to zoom';
exports.EDIT_BUTTON_LABEL = 'Edit';
exports.SHARE_BUTTON_LABEL = 'Share';
exports.WISH_BUTTON_LABEL = 'Wish';
exports.NEXT_LABEL = 'next';
exports.PREVIOUS_LABEL = 'prev';
exports.NONE_LABEL = 'none';
exports.CAROUSSEL_CLASSNAME = 'carousel';
exports.LOADING_LABEL = 'Loading...';
exports.SKU_ERROR_MESSAGE = 'No sku found, Please try again';
exports.RECIPEID_ERROR_MESSAGE = 'No Recipeid found, Please try again';
exports.MINUS_LABEL = 'minus';
exports.PLUS_LABEL = 'plus';
exports.PAGES_TITLES = {
    home: {
        en: 'LouisVuitton - Your Product Personalization',
        zh: '个性化定制',
    },
    summary: {
        en: 'LouisVuitton - Your Product Personalization',
        zh: '概括',
    },
    client: {
        en: 'LouisVuitton - Your Product Personalization',
        zh: '配置',
    },
};
exports.PORTRAIT_FORM_BASE_HEIGHT_IN_PX = 326;
exports.LANDSCAPE_FORM_MAX_HEIGHT_IN_PX = 270;
exports.PORTRAIT_FORM_MAX_HEIGHT_IN_PX = 500;
exports.PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN = 4;
exports.PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE = 97;
