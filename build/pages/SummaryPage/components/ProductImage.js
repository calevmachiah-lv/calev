"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SummaryPage_styles_1 = require("../SummaryPage.styles");
const constants_1 = require("../../../utils/constants");
const assets_1 = require("../../../assets");
const components_1 = require("../../../components");
const assets_2 = require("../../../assets");
const ProductImage = ({ productImages, isLoading, }) => {
    var _a;
    const [imageLoaded, setImageLoaded] = (0, react_1.useState)({
        loaded: false,
        error: false,
    });
    const productImg = imageLoaded.error
        ? assets_1.PICTURE_PLACEHOLDER
        : (productImages === null || productImages === void 0 ? void 0 : productImages[constants_1.MAIN_ATTACHMENT_KEY])
            ? productImages[constants_1.MAIN_ATTACHMENT_KEY] + ',1.webp'
            : (_a = Object.values(productImages)) === null || _a === void 0 ? void 0 : _a[0];
    const loading = isLoading || imageLoaded.loaded;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(SummaryPage_styles_1.ProductImgLoader, { children: [loading && (0, jsx_runtime_1.jsx)(components_1.LVLoader, {}), (0, jsx_runtime_1.jsx)(SummaryPage_styles_1.ProductImg, { imageToDisplay: assets_2.SUMMARY_IMG, onAbort: () => setImageLoaded(Object.assign(Object.assign({}, imageLoaded), { error: true })), onError: () => setImageLoaded(Object.assign(Object.assign({}, imageLoaded), { error: true })), onLoad: () => setImageLoaded(Object.assign(Object.assign({}, imageLoaded), { loaded: true })) })] }) }));
};
exports.ProductImage = ProductImage;
exports.default = exports.ProductImage;
