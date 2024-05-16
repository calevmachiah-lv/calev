"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SummaryCarousel_styles_1 = require("./SummaryCarousel.styles");
const Attributes_1 = __importDefault(require("../AttributesGroups/Attributes"));
const constants_1 = require("../../../utils/constants");
const SummaryCarousel = (props) => {
    const configData = props.config;
    const currentStep = 0;
    const [[currentAttributesGroupKey, currentAttributesGroup], setCurrentCategory,] = (0, react_1.useState)(Object.entries(configData)[currentStep]);
    const totalSteps = (0, react_1.useMemo)(() => Object.keys(configData).length, [configData]);
    const carousel = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setCurrentCategory(Object.entries(configData)[currentStep]);
    }, [currentStep, configData, totalSteps]);
    (0, react_1.useEffect)(() => {
        if (carousel === null || carousel === void 0 ? void 0 : carousel.current)
            carousel.current.scrollTo(0, 0);
    }, [currentStep]);
    return ((0, jsx_runtime_1.jsxs)(SummaryCarousel_styles_1.CarouselContainer, { className: constants_1.CAROUSSEL_CLASSNAME, ref: carousel, children: [(0, jsx_runtime_1.jsx)(SummaryCarousel_styles_1.Heading, { children: currentAttributesGroupKey }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { attributes: currentAttributesGroup })] }));
};
exports.default = SummaryCarousel;
