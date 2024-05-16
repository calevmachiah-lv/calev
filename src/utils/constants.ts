/*****************************************************
 * Dev-Kit URL
 ****************************************************/

export const DEFAULT_SERVER_URL = `https://localhost:5000`;

export const DATATABLE_API_ROUTE = `/api/datatables`;
export const CONFIGURATIONS_API_ROUTE = `/api/configurations`;
export const CATALOG_API_ROUTE = `/api/catalog`;
export const FILES_API_ROUTE = `/api/files`;
export const ORDERS_API_ROUTE = '/api/orders';
export const ORG_API_ROUTE = '/api/orgs';
export const PRODUCTS_API_ROUTE = `/api/products`;
export const SERVER_API_ROUTE = '/api';

/*****************************************************
 * Dev-Kit CSS Class
 ****************************************************/

export const DEFAULT_CLASS_NAME = 'threekit-react';
export const CLASS_NAME_PREFIX = 'tk';

export const INPUT_COMPONENT_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-input`;
export const WIDGET_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-widget`;
export const LAYOUT_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-layout`;
export const TOOL_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-tool`;
export const DISPLAY_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-display`;

/*****************************************************
 * Saved Configuration URL Params
 ****************************************************/

export const TK_SAVED_CONFIG_PARAM_KEY = 'threekitId'; // TODO threekitId

export const SKU_ATTRIBUTE_NAME = '_SKU';

/*****************************************************
 * Threekit Player initialization Defaults
 ****************************************************/

export const TK_PLAYER_DIV_ID_2D = 'threekit-player-2d';
export const TK_PLAYER_DIV_ID_3D = 'threekit-player-3d';
export const TUTORIAL_DIV_ID = 'tutorial';
export const HELPER_DIV_ID = 'helper';
export const HOME_CONTAINER = 'home-container';

export const TK_PLAYER_ATTRIBUTE_ID = 'b14655f6-a57a-4752-a807-205d14ea82c2';

export const DEFAULT_PLAYER_CONFIG = {
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

export const ATTRIBUTES_RESERVED = {
  step: '_step',
  camera: '_camera',
  dimensions: '_dimensions',
};

export const ATTRIBUTE_TYPES = {
  asset: 'Asset',
  string: 'String',
  number: 'Number',
  color: 'Color',
  boolean: 'Boolean',
  arraySelector: 'AttributesArraySelector',
  arrayEditor: 'AttributesArrayEditor',
};

export const SORT_OPTIONS = {
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

export const ARRAY_VALIDATION = Object.assign(
  arrayValidations,
  arrayItemValidations
);
/*****************************************************
 * Reserved Catalog Item Metadata Properties
 ****************************************************/

export const METADATA_RESERVED = Object.assign(
  {
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
  Object.entries(arrayItemValidations).reduce(
    (output, [key, val]) => Object.assign(output, { [key]: `_${val}` }),
    {}
  )
);

/*****************************************************
 * Snapshot
 ****************************************************/

export const SNAPSHOT_FORMATS: { png: string; jpeg: string } = {
  png: 'png',
  jpeg: 'jpeg',
};

export const SNAPSHOT_OUTPUTS = {
  url: 'url',
  download: 'download',
  dataUrl: 'dataUrl',
  blob: 'blob',
};

export const DEFAULT_CAMERA_CONFIG = {
  attributeName: 'CameraAngle',
  size: { width: 610, height: 576 },
  format: SNAPSHOT_FORMATS.png,
};

/*****************************************************
 * Additional Display options
 **********************************ffff******************/

export const DISPLAY_OPTIONS = {
  modal: 'modal',
  drawer: 'drawer',
};

export const ATTRIBUTE_NAME_TO_HIDE = [
  'CameraAngle',
  'CharacterLimit',
  'Model Presentation',
  'Rotate Model',
  'dataDrivenConfiguratorToolSwitch',
];

export const VERSION = '1.0.314';
export const MAIN_ATTACHMENT_KEY = 'Front';
// export const MAIN_ATTACHMENT_KEY = 'Packshot';

export const RESET_STEP_CAROUSEL = 0;
export const RESET_STEP_ACCORDION = 0;
export const MEASURE_UNIT = 'px';
export const TITLE_PLACEHOLDER = 'Title is missing';
export const DESCRIPTION_PLACEHOLDER = 'Description is missing';
export const PRODUCTNAME_PLACEHOLDER = 'Product Name is missing';
export const PRICE_PLACEHOLDER = 'Price is Missing';
export const SMALL_SIZE_LABEL = 'small';
export const MEDIUM_SIZE_LABEL = 'medium';
export const BIG_SIZE_LABEL = 'big';
export const VERTICAL_SIZE_LABEL = 'vertical';
export const AVAILABLE_ASSETS_OPACITY_VALUE = '1';
export const UNAVAILABLE_ASSETS_OPACITY_VALUE = '0.2';
export const OOB_APPNAME = 'oob';
export const PATCH_STYLE_LABEL = 'patch';
export const CATALOGWECOM_APPNAME = 'catalogwecom';
export const CATALOGDESKTOP_APPNAME = 'catalogdesktop';
export const FAKE_SKU = 'N534234';
export const DONE_BUTTON_LABEL = 'Done';
export const SURPRISE_ME_BUTTON_LABEL = 'surprise me';
export const CLOSE_BUTTON_LABEL = 'Close';
export const RESET_BUTTON_LABEL = 'Reset';
export const HELPER_BUTTON_LABEL = 'helper';
export const INSTOCK_BUTTON_LABEL = 'inStock';
export const ADDTOBAG_BUTTON_LABEL = 'add to bag';
export const MODIFY_BUTTON_LABEL = 'modify your Lucky Louis';
export const LEADTIME_BUTTON_LABEL = 'Not orderable';
export const ZOOM_BUTTON_LABEL = 'zoom';
export const INFO_ZOOM_BUTTON_LABEL = 'Press and hold to zoom';
export const EDIT_BUTTON_LABEL = 'Edit';
export const SHARE_BUTTON_LABEL = 'Share';
export const WISH_BUTTON_LABEL = 'Wish';

export const NEXT_LABEL = 'next';
export const PREVIOUS_LABEL = 'prev';
export const NONE_LABEL = 'none';
export const CAROUSSEL_CLASSNAME = 'carousel';
export const LOADING_LABEL = 'Loading...';
export const SKU_ERROR_MESSAGE = 'No sku found, Please try again';
export const RECIPEID_ERROR_MESSAGE = 'No Recipeid found, Please try again';
export const MINUS_LABEL = 'minus';
export const PLUS_LABEL = 'plus';

interface IPageTitles {
  [key: string]: {
    en: string;
    zh: string;
  };
}

export const PAGES_TITLES: IPageTitles = {
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

export const PORTRAIT_FORM_BASE_HEIGHT_IN_PX = 326;
export const LANDSCAPE_FORM_MAX_HEIGHT_IN_PX = 270;
export const PORTRAIT_FORM_MAX_HEIGHT_IN_PX = 500;
export const PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN = 4;
export const PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE = 97;
