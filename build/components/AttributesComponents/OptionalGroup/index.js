"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const assets_1 = require("../../../assets");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const optionalGroup_styled_1 = require("./optionalGroup.styled");
const Attributes_1 = __importDefault(require("../../Form/AttributesGroups/Attributes"));
function OptionalGroup({ attribute, attributesInGroup = 1, elseAttributes, }) {
    const [attributeData, handleChange] = (0, threekitHooks_1.useAttribute)(attribute.name);
    const openValue = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a.find((val) => {
            var _a, _b;
            return ((_a = val === null || val === void 0 ? void 0 : val.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('yes ')) ||
                ((_b = val === null || val === void 0 ? void 0 : val.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'yes';
        });
    }, [attributeData]);
    const closeValue = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a.find((val) => {
            var _a, _b;
            return ((_a = val === null || val === void 0 ? void 0 : val.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('no ')) ||
                ((_b = val === null || val === void 0 ? void 0 : val.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'no';
        });
    }, [attributeData]);
    const isOpen = (0, react_1.useMemo)(() => {
        var _a;
        return ((_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _a === void 0 ? void 0 : _a.assetId) === (openValue === null || openValue === void 0 ? void 0 : openValue.assetId);
    }, [attributeData, openValue]);
    const handleClose = (0, react_1.useCallback)(() => {
        handleChange(closeValue === null || closeValue === void 0 ? void 0 : closeValue.assetId);
    }, [handleChange, closeValue === null || closeValue === void 0 ? void 0 : closeValue.assetId]);
    const handleOpen = (0, react_1.useCallback)(() => {
        handleChange(openValue === null || openValue === void 0 ? void 0 : openValue.assetId);
    }, [handleChange, openValue === null || openValue === void 0 ? void 0 : openValue.assetId]);
    return ((0, jsx_runtime_1.jsxs)(optionalGroup_styled_1.OptionalGroupWrapper, { children: [(0, jsx_runtime_1.jsx)(optionalGroup_styled_1.ClosedAttributes, { children: (0, jsx_runtime_1.jsxs)(optionalGroup_styled_1.ClickableArea, { onClick: handleClose, children: [(0, jsx_runtime_1.jsx)(optionalGroup_styled_1.RadioButton, { src: isOpen ? assets_1.UNCHECKED_RADIO_BUTTON_ICON : assets_1.CHECKED_RADIO_BUTTON_ICON }), (0, jsx_runtime_1.jsx)(optionalGroup_styled_1.RadioButtonTitle, { children: closeValue === null || closeValue === void 0 ? void 0 : closeValue.displayName })] }) }), (0, jsx_runtime_1.jsxs)(optionalGroup_styled_1.OpenedAttributes, { open: isOpen, disabled: false, children: [(0, jsx_runtime_1.jsxs)(optionalGroup_styled_1.ClickableArea, { onClick: handleOpen, children: [(0, jsx_runtime_1.jsx)(optionalGroup_styled_1.RadioButton, { src: isOpen ? assets_1.CHECKED_RADIO_BUTTON_ICON : assets_1.UNCHECKED_RADIO_BUTTON_ICON }), (0, jsx_runtime_1.jsx)(optionalGroup_styled_1.RadioButtonTitle, { children: openValue === null || openValue === void 0 ? void 0 : openValue.displayName })] }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { attributes: elseAttributes, insideOptionalGroup: true, isActive: isOpen, numOfAttrs: attributesInGroup })] })] }));
}
exports.default = OptionalGroup;
