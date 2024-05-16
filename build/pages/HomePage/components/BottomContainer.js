"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AttributeValues_1 = __importDefault(require("../../../components/AttributeValues"));
const useActiveAttribute_1 = __importDefault(require("../../../hooks/useActiveAttribute"));
const landscapeForm_styles_1 = require("./landscapeForm.styles");
const BottomContainer = (props) => {
    const { attribute, attributes } = props;
    const { activeAttribute, selectedValues } = (0, useActiveAttribute_1.default)();
    return ((0, jsx_runtime_1.jsx)(landscapeForm_styles_1.ValuesContainer, { style: {
            opacity: activeAttribute === attribute.name ? '1' : '0',
            zIndex: activeAttribute === attribute.name ? '1' : '-1',
            transform: activeAttribute === attribute.name
                ? 'translateY(0)'
                : 'translateY(100%)',
        }, children: (0, jsx_runtime_1.jsx)(AttributeValues_1.default, { attributeNames: attributes.map((attribute) => attribute.name), selectedValues: selectedValues }) }, attribute.name));
};
exports.default = BottomContainer;
