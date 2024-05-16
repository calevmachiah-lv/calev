"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveAttributeSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const activeAttributeSelector_styles_1 = require("./activeAttributeSelector.styles");
const AttributeValues_1 = __importDefault(require("../AttributeValues"));
const ActiveAttributeTitle_1 = __importDefault(require("../ActiveAttributeTitle"));
const SlectedValuesOfAttribute_1 = __importDefault(require("../SlectedValuesOfAttribute"));
const CloseIcon_1 = __importDefault(require("../CloseIcon"));
function ActiveAttributeSelector({ attributes, isActive, closeAttribute, selectedValues, }) {
    return ((0, jsx_runtime_1.jsxs)(activeAttributeSelector_styles_1.ActiveAttributeSelectorContainer, { style: {
            bottom: isActive ? `0px` : '-110%',
        }, onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)(CloseIcon_1.default, { onClick: closeAttribute }), (0, jsx_runtime_1.jsx)(ActiveAttributeTitle_1.default, {}), (0, jsx_runtime_1.jsx)(SlectedValuesOfAttribute_1.default, { selectedValues: selectedValues }), (0, jsx_runtime_1.jsx)(activeAttributeSelector_styles_1.ValuesContainer, { children: (0, jsx_runtime_1.jsx)(AttributeValues_1.default, { attributeNames: attributes.map((attribute) => attribute.name), selectedValues: selectedValues }) }), (0, jsx_runtime_1.jsx)(activeAttributeSelector_styles_1.CloseButton, { onClick: closeAttribute, children: "Apply" })] }));
}
exports.ActiveAttributeSelector = ActiveAttributeSelector;
