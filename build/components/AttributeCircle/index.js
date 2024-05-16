"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const assets_1 = require("../../assets");
const attributeCircle_styles_1 = require("./attributeCircle.styles");
function AttributeCircle({ attributeName, openAttribute, selectedValue, isActive, inStock, isSelected, isTutorialCurrentStep = false, }) {
    const img = isSelected
        ? (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue._thumbnailUrl) ||
            'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png'
        : assets_1.PLUS_ATTRIBUTE_ICON;
    return ((0, jsx_runtime_1.jsxs)(attributeCircle_styles_1.AttributeCircleContainer, { isActive: isActive, children: [(0, jsx_runtime_1.jsx)(attributeCircle_styles_1.CircleContainer, { onClick: openAttribute, inStock: inStock, img: img, isSelected: isSelected, isTutorialCurrentStep: isTutorialCurrentStep, children: (0, jsx_runtime_1.jsx)(attributeCircle_styles_1.CircleImage, { children: (0, jsx_runtime_1.jsx)(attributeCircle_styles_1.Image, { src: img }) }) }), (0, jsx_runtime_1.jsx)(attributeCircle_styles_1.AttributeName, { isTutorialCurrentStep: isTutorialCurrentStep, isActive: isActive, children: attributeName })] }));
}
exports.default = AttributeCircle;
