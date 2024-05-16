"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const LVLoader_styles_1 = require("./LVLoader.styles");
const assets_1 = require("../../assets");
const loader = assets_1.LV_LOADER;
const LVLoader = ({ display, isPlayerLoading, currentMode, currentSize, }) => {
    return display || isPlayerLoading ? ((0, jsx_runtime_1.jsx)(LVLoader_styles_1.LoaderContainer, { currentMode: currentMode, playerSize: currentSize, children: (0, jsx_runtime_1.jsx)("img", { src: loader, alt: 'loading animation' }) })) : null;
};
exports.default = LVLoader;
