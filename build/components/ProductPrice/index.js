"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const i18next_1 = require("i18next");
const react_1 = __importDefault(require("react"));
const constants_1 = require("../../utils/constants");
const Price_styles_1 = require("./Price.styles");
const usePrice_1 = __importDefault(require("../../hooks/usePrice"));
const ProductPrice = react_1.default.memo(() => {
    const { isLoading, isError, priceFormated } = (0, usePrice_1.default)();
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Price_styles_1.ProductPriceShimmer, {});
    }
    if (isError || !priceFormated) {
        return ((0, jsx_runtime_1.jsx)(Price_styles_1.StyledProductPrice, { children: (0, i18next_1.t)('product.label.missing_price', { defaultValue: constants_1.PRICE_PLACEHOLDER }) }));
    }
    return (0, jsx_runtime_1.jsx)(Price_styles_1.StyledProductPrice, { children: priceFormated });
});
exports.default = ProductPrice;
