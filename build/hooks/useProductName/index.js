"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const selectors_1 = require("../../store/threekitSlicer/selectors");
const constants_1 = require("../../utils/constants");
const globalSettingsSlicer_1 = require("../../store/globalSettingsSlicer");
const useProductName = () => {
    const { productName: productNameUrl } = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getGlobalSettingsParams) || {};
    const { ProductName: productNameConfigurator } = (0, react_redux_1.useSelector)(selectors_1.getMetadata) || {
        ProductName: null,
    };
    return productNameConfigurator || productNameUrl || constants_1.PRODUCTNAME_PLACEHOLDER;
};
exports.default = useProductName;
