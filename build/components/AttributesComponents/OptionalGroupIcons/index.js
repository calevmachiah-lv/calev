"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const assets_1 = require("../../../assets");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const optionalGroupIcons_styled_1 = require("./optionalGroupIcons.styled");
const Attributes_1 = __importDefault(require("../../Form/AttributesGroups/Attributes"));
function OptionalGroupIcons({ attribute, attributesInGroup = 1, elseAttributes = [], }) {
    const [attributeData, handleChange] = (0, threekitHooks_1.useAttribute)(attribute.name);
    const openValue = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a.find((val) => { var _a; return ((_a = val === null || val === void 0 ? void 0 : val.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'yes'; });
    }, [attributeData]);
    const closeValue = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a.find((val) => { var _a; return ((_a = val === null || val === void 0 ? void 0 : val.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'no'; });
    }, [attributeData]);
    const isOpen = (0, react_1.useMemo)(() => {
        var _a;
        return ((_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _a === void 0 ? void 0 : _a.assetId) === (openValue === null || openValue === void 0 ? void 0 : openValue.assetId);
    }, [attributeData, openValue === null || openValue === void 0 ? void 0 : openValue.assetId]);
    const handleClose = (0, react_1.useCallback)(() => {
        handleChange(closeValue === null || closeValue === void 0 ? void 0 : closeValue.assetId);
    }, [handleChange, closeValue === null || closeValue === void 0 ? void 0 : closeValue.assetId]);
    const handleOpen = (0, react_1.useCallback)(() => {
        handleChange(openValue === null || openValue === void 0 ? void 0 : openValue.assetId);
    }, [handleChange, openValue === null || openValue === void 0 ? void 0 : openValue.assetId]);
    return ((0, jsx_runtime_1.jsxs)(optionalGroupIcons_styled_1.OptionalGroupWrapper, { children: [(0, jsx_runtime_1.jsxs)(optionalGroupIcons_styled_1.IconsWrapper, { children: [(0, jsx_runtime_1.jsxs)(optionalGroupIcons_styled_1.ClickableArea, { onClick: handleOpen, children: [(0, jsx_runtime_1.jsx)(optionalGroupIcons_styled_1.Icon, { src: isOpen ? assets_1.ADD_OPTIONAL_SELECTED : assets_1.ADD_OPTIONAL_UNSELECTED }), (0, jsx_runtime_1.jsx)(optionalGroupIcons_styled_1.IconTitle, { children: openValue === null || openValue === void 0 ? void 0 : openValue.displayName })] }), (0, jsx_runtime_1.jsxs)(optionalGroupIcons_styled_1.ClickableArea, { onClick: handleClose, children: [(0, jsx_runtime_1.jsx)(optionalGroupIcons_styled_1.Icon, { src: isOpen ? assets_1.DONT_ADD_OPTIONAL_UNSELECTED : assets_1.DONT_ADD_OPTIONAL_SELECTED }), (0, jsx_runtime_1.jsx)(optionalGroupIcons_styled_1.IconTitle, { children: closeValue === null || closeValue === void 0 ? void 0 : closeValue.displayName })] })] }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { attributes: elseAttributes, insideOptionalGroup: true, optionalGroupIcon: true, isActive: isOpen, numOfAttrs: attributesInGroup })] }));
}
exports.default = OptionalGroupIcons;
