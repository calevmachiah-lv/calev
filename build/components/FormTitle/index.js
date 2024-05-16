"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_redux_1 = require("react-redux");
const formTitle_styles_1 = require("./formTitle.styles");
const threekitSlicer_1 = require("../../store/threekitSlicer");
function FormTitle() {
    const productName = (0, react_redux_1.useSelector)(threekitSlicer_1.getProductName);
    return (0, jsx_runtime_1.jsx)(formTitle_styles_1.Title, { children: productName });
}
exports.default = FormTitle;
