"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useActiveAttribute_1 = __importDefault(require("../../hooks/useActiveAttribute"));
const functions_1 = require("../../utils/function/functions");
function ActiveAttributeTitle() {
    const { attributeData } = (0, useActiveAttribute_1.default)();
    return (attributeData === null || attributeData === void 0 ? void 0 : attributeData.groupName) || (attributeData === null || attributeData === void 0 ? void 0 : attributeData.name) ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '18px', lineHeight: '24px' }, children: ["Select a", ' ', (attributeData === null || attributeData === void 0 ? void 0 : attributeData.groupName)
                ? (0, functions_1.extractGroupNameFromGroupKey)(attributeData === null || attributeData === void 0 ? void 0 : attributeData.groupName)
                : attributeData === null || attributeData === void 0 ? void 0 : attributeData.name] })) : null;
}
exports.default = ActiveAttributeTitle;
