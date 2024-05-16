"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SummaryForm_style_1 = require("./SummaryForm.style");
const SummaryCarousel_1 = __importDefault(require("./Carousel/SummaryCarousel"));
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const isSLider = true;
const Form = () => {
    const formData = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    if (!formData)
        return null;
    return ((0, jsx_runtime_1.jsx)(SummaryForm_style_1.Container, { children: formData && isSLider ? ((0, jsx_runtime_1.jsx)(SummaryCarousel_1.default, { config: formData })) : null }));
};
exports.default = Form;
