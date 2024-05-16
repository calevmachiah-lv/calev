"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const FormTitle_1 = __importDefault(require("../../components/FormTitle"));
const CloseIcon_1 = __importDefault(require("../../components/CloseIcon"));
const flowSlicer_1 = require("../../store/flowSlicer");
const ProductPrice_1 = __importDefault(require("../../components/ProductPrice"));
const recapPage_styles_1 = require("./recapPage.styles");
const components_1 = require("../../components");
const constants_1 = require("../../utils/constants");
const assets_1 = require("../../assets");
const functions_1 = require("../../utils/function/functions");
function RecapPage({ show, slidePercentsToOpen, handleTouchStart, handleTouchMove, handleTouchEnd, }) {
    var _a, _b;
    const dispatch = (0, react_redux_1.useDispatch)();
    const groupedAttributes = (0, react_redux_1.useSelector)(threekitSlicer_1.getGroupedAttributes) || {};
    const recapOpenPercentage = (0, react_redux_1.useSelector)(flowSlicer_1.getRecapOpenPercentage);
    const inStockData = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsInStock) || {};
    const disabledDoneButton = (0, react_1.useMemo)(() => {
        var _a, _b;
        let disabled = true;
        if (!Object.values((_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.attributes).includes('NA')) {
            disabled = false;
        }
        return disabled;
    }, [(_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.attributes]);
    return ((0, jsx_runtime_1.jsxs)(recapPage_styles_1.RecapWrapper, { show: show, openPercentage: recapOpenPercentage, slidePercentsToOpen: slidePercentsToOpen || 0, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [(0, jsx_runtime_1.jsx)(CloseIcon_1.default, { onClick: () => dispatch((0, flowSlicer_1.closeRecap)(true)), css: { position: 'absolute', margin: '0 0 20px auto' } }), (0, jsx_runtime_1.jsx)(FormTitle_1.default, {}), (0, jsx_runtime_1.jsx)(ProductPrice_1.default, {}), (0, jsx_runtime_1.jsx)(recapPage_styles_1.ConfigurationWrapper, { children: Object.keys(groupedAttributes).map((key) => {
                    const isGroup = groupedAttributes[key].length > 1;
                    const values = groupedAttributes[key]
                        .map((attribute) => attribute.values.filter((value) => value.selected))
                        .flat();
                    return ((0, jsx_runtime_1.jsxs)(recapPage_styles_1.AttributeWrapper, { children: [(0, jsx_runtime_1.jsx)(recapPage_styles_1.AttributeTitle, { children: key }), (0, jsx_runtime_1.jsx)(recapPage_styles_1.AttributeValues, { onClick: () => {
                                    var _a;
                                    dispatch((0, flowSlicer_1.closeRecap)(true));
                                    dispatch((0, threekitSlicer_1.setActiveAttribute)((_a = groupedAttributes[key][0]) === null || _a === void 0 ? void 0 : _a.name));
                                }, children: (values === null || values === void 0 ? void 0 : values.length) ? (values.map((value) => {
                                    const isEmpty = (0, functions_1.isChooseValue)(value);
                                    const inStock = inStockData[value === null || value === void 0 ? void 0 : value.sku] !== false;
                                    return ((0, jsx_runtime_1.jsx)(recapPage_styles_1.ValueWrapper, { inStock: inStock || isEmpty, isEmpty: isEmpty, children: isEmpty ? ((0, jsx_runtime_1.jsx)(recapPage_styles_1.Value, { isEmpty: true, children: "+" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isGroup && (0, jsx_runtime_1.jsx)(recapPage_styles_1.Value, { children: value.name }), (0, jsx_runtime_1.jsx)(recapPage_styles_1.ValueImg, { src: value._thumbnailUrl ||
                                                        'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png' }, value.name)] })) }, value.name));
                                })) : ((0, jsx_runtime_1.jsx)(recapPage_styles_1.PlusContainer, { img: assets_1.PLUS_ATTRIBUTE_ICON, children: (0, jsx_runtime_1.jsx)(recapPage_styles_1.PlusImage, { src: assets_1.PLUS_ATTRIBUTE_ICON }) })) })] }, key));
                }) }), (0, jsx_runtime_1.jsx)(recapPage_styles_1.DoneButtonWrapper, { children: (0, jsx_runtime_1.jsx)(components_1.OptionsButton, { disable: disabledDoneButton, buttonName: constants_1.DONE_BUTTON_LABEL }) })] }));
}
exports.default = RecapPage;
