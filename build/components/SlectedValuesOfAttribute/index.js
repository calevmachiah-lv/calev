"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const selectedValuesOfAttribute_styles_1 = require("./selectedValuesOfAttribute.styles");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
function SelectedValuesOfAttribute({ selectedValues, }) {
    const inStockData = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsInStock);
    return ((0, jsx_runtime_1.jsx)(selectedValuesOfAttribute_styles_1.SelectedValuesContainer, { children: selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.map((value, i) => {
            const inStock = (inStockData === null || inStockData === void 0 ? void 0 : inStockData[value === null || value === void 0 ? void 0 : value.sku]) !== false;
            return ((0, jsx_runtime_1.jsxs)(selectedValuesOfAttribute_styles_1.SelectedValue, { inStock: inStock, children: [value === null || value === void 0 ? void 0 : value.displayName, (0, jsx_runtime_1.jsx)("span", { style: { color: '#767676' }, children: i !== selectedValues.length - 1 && '  | ' })] }, `selectedValue-${value === null || value === void 0 ? void 0 : value.displayName}`));
        }) }));
}
exports.default = SelectedValuesOfAttribute;
