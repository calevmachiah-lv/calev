"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const AttributeCircle_1 = __importDefault(require("../AttributeCircle"));
const attributes_styles_1 = require("./attributes.styles");
const threekitHooks_1 = require("../../utils/threekitHooks");
const ActiveAttributeSelector_1 = require("../ActiveAttributeSelector");
const flowSlicer_1 = require("../../store/flowSlicer");
const functions_1 = require("../../utils/function/functions");
const Attributes = ({ tutorialStep, displayTutorial, }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const groupedAttributes = (0, react_redux_1.useSelector)(threekitSlicer_1.getGroupedAttributes) || {};
    const activeAttribute = (0, react_redux_1.useSelector)(threekitSlicer_1.getActiveAttribute);
    const displayRecap = (0, react_redux_1.useSelector)(flowSlicer_1.getDisplayRecap);
    const inStockData = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsInStock);
    const { isMobile, width } = (0, threekitHooks_1.useWindowSize)();
    const openAttribute = (0, react_1.useCallback)((attribute) => {
        dispatch((0, threekitSlicer_1.setActiveAttribute)(attribute.name));
    }, [dispatch]);
    const closeAttribute = (0, react_1.useCallback)(() => {
        dispatch((0, threekitSlicer_1.setActiveAttribute)(''));
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        if (width !== 0 &&
            !isMobile &&
            !activeAttribute &&
            Object.keys(groupedAttributes).length) {
            openAttribute(Object.values(groupedAttributes)[0][0]);
        }
        else if (isMobile && displayRecap && activeAttribute) {
            closeAttribute();
            dispatch((0, flowSlicer_1.setRecapOpenPercentage)(100));
        }
    }, [
        activeAttribute,
        openAttribute,
        isMobile,
        groupedAttributes,
        width,
        displayRecap,
        closeAttribute,
        dispatch,
    ]);
    (0, react_1.useEffect)(() => {
        if (displayTutorial) {
            closeAttribute();
        }
    }, [displayTutorial, closeAttribute]);
    return ((0, jsx_runtime_1.jsx)(attributes_styles_1.AttributesContainer, { children: (0, jsx_runtime_1.jsx)(attributes_styles_1.AttributesFlex, { children: Object.entries(groupedAttributes).map(([groupName, attributes], index) => {
                var _a;
                const selectedValues = attributes.map((attribute) => attribute.values.find((value) => value === null || value === void 0 ? void 0 : value.selected));
                const isGroup = (_a = attributes[0]) === null || _a === void 0 ? void 0 : _a.groupName;
                const selectedValue = selectedValues[0];
                const isSelected = selectedValues.some((value) => (value === null || value === void 0 ? void 0 : value.assetId) && !(0, functions_1.isChooseValue)(value));
                return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(AttributeCircle_1.default, { attributeName: isGroup ? groupName : attributes[0].name || '', isActive: activeAttribute === attributes[0].name, isTutorialCurrentStep: tutorialStep === index && displayTutorial, selectedValue: selectedValue, isSelected: isSelected, openAttribute: () => openAttribute(attributes[0]), inStock: selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.every((value) => (inStockData === null || inStockData === void 0 ? void 0 : inStockData[value === null || value === void 0 ? void 0 : value.sku]) !== false) }), isMobile && ((0, jsx_runtime_1.jsx)(ActiveAttributeSelector_1.ActiveAttributeSelector, { attributes: attributes, selectedValues: selectedValues, isActive: activeAttribute === attributes[0].name, closeAttribute: closeAttribute }))] }, attributes[0].name));
            }) }) }));
};
exports.default = Attributes;
