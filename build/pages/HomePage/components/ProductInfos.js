"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfos = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Home_styles_1 = require("../Home.styles");
const ProductPrice_1 = __importDefault(require("../../../components/ProductPrice"));
const hooks_1 = require("../../../hooks");
const AutoDisappearElement_1 = __importDefault(require("./AutoDisappearElement"));
const ProductInfos = () => {
    const productName = (0, hooks_1.useProductName)();
    return ((0, jsx_runtime_1.jsxs)(Home_styles_1.ProductInfosContainer, { children: [(0, jsx_runtime_1.jsx)(AutoDisappearElement_1.default, { children: (0, jsx_runtime_1.jsx)(Home_styles_1.ProductName, { children: productName }) }), (0, jsx_runtime_1.jsx)(ProductPrice_1.default, {})] }));
};
exports.ProductInfos = ProductInfos;
exports.default = exports.ProductInfos;
