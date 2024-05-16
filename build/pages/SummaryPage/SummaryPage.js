"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const SummaryPage_styles_1 = require("./SummaryPage.styles");
const threekitHooks_1 = require("../../utils/threekitHooks");
const TopSection_1 = __importDefault(require("../../components/TopSection/TopSection"));
const hooks_1 = require("../../hooks");
const ProductImage_1 = __importDefault(require("./components/ProductImage"));
const selectors_1 = require("../../store/globalSettingsSlicer/selectors");
const SummaryButtons_1 = require("../../components/SummaryButtons");
const OrderButtons_1 = require("../../components/OrderButtons");
const SummaryPage = ({ data }) => {
    (0, hooks_1.usePageTitle)({ page: 'summary' });
    const globalSettingsParams = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const { appName } = globalSettingsParams || {};
    const isLoaded = (0, threekitHooks_1.useThreekitInitStatus)();
    const [attributesToDisplay, setAttributesToDisplay] = (0, react_1.useState)();
    const [productImages, setProductImages] = (0, react_1.useState)((data === null || data === void 0 ? void 0 : data.attachments) || {});
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(SummaryPage_styles_1.Container, { children: [(0, jsx_runtime_1.jsx)(ProductImage_1.default, { productImages: productImages, isLoading: isLoaded }), (0, jsx_runtime_1.jsx)(SummaryPage_styles_1.ContentWrapper, { children: (0, jsx_runtime_1.jsxs)(SummaryPage_styles_1.WrapperContainer, { children: [(0, jsx_runtime_1.jsx)(TopSection_1.default, { summaryPage: true }), (0, jsx_runtime_1.jsx)(SummaryButtons_1.SummaryButtons, {}), (0, jsx_runtime_1.jsx)(OrderButtons_1.OrderButtons, {})] }) })] }) }));
};
exports.default = SummaryPage;
