"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const radioButtons_styles_1 = require("./radioButtons.styles");
const assets_1 = require("../../../assets");
const constants_1 = require("../../../utils/constants");
const attributesHelperFn_1 = require("../../../utils/function/attributesHelperFn");
const i18next_1 = require("i18next");
function RadioButtons({ attribute, validValues }) {
    var _a, _b;
    const [attributeData, handleChange] = (0, threekitHooks_1.useAttribute)(attribute.name);
    const [descriptionOpened, setDescriptionOpened] = (0, react_1.useState)(null);
    (0, threekitHooks_1.useWindowSize)();
    const [selected, setSelected] = (0, react_1.useState)((_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _a === void 0 ? void 0 : _a.assetId);
    const [mappedValidAttributes, setMappedValidAttributes] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const attributeMap = Object.fromEntries(attribute.values.map((attr) => [attr.name, attr.metadata.description]));
        const updatedValidAttributes = validValues.map((validAttribute) => (Object.assign(Object.assign({}, validAttribute), { description: attributeMap[validAttribute.name] || '' })));
        // Set the state with the updated array
        setMappedValidAttributes(updatedValidAttributes);
    }, [attribute.values, validValues]);
    (0, react_1.useEffect)(() => {
        var _a;
        setSelected((_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _a === void 0 ? void 0 : _a.assetId);
    }, [(_b = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _b === void 0 ? void 0 : _b.assetId]);
    const toggleDescription = (0, react_1.useCallback)((name) => {
        if (descriptionOpened === name) {
            setDescriptionOpened(null);
        }
        else {
            setDescriptionOpened(name);
        }
    }, [descriptionOpened]);
    const handleSelect = (0, react_1.useCallback)((value) => {
        handleChange(value === null || value === void 0 ? void 0 : value.assetId);
        toggleDescription((value === null || value === void 0 ? void 0 : value.assetId) || '');
    }, [handleChange, toggleDescription]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (selected === '' && (0, attributesHelperFn_1.getAttributeIndex)(attributeData === null || attributeData === void 0 ? void 0 : attributeData.name) === 0) {
            handleChange((_b = (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.assetId);
        }
    }, [selected, handleChange, attributeData === null || attributeData === void 0 ? void 0 : attributeData.name, attributeData === null || attributeData === void 0 ? void 0 : attributeData.values]);
    return ((0, jsx_runtime_1.jsx)(radioButtons_styles_1.RadioButtonsWrapper, { children: mappedValidAttributes.map((value, index) => {
            const showDescription = descriptionOpened === (value === null || value === void 0 ? void 0 : value.name);
            return ((0, jsx_runtime_1.jsxs)(radioButtons_styles_1.RadioButtonWrapper, { showDescription: showDescription, onClick: () => handleSelect(value), children: [(0, jsx_runtime_1.jsxs)(radioButtons_styles_1.RadioButtonHeader, { children: [(0, jsx_runtime_1.jsxs)(radioButtons_styles_1.ClickableArea, { showDescription: showDescription, children: [(0, jsx_runtime_1.jsx)(radioButtons_styles_1.RadioButton, { src: selected === (value === null || value === void 0 ? void 0 : value.assetId)
                                            ? assets_1.CHECKED_RADIO_BUTTON_ICON
                                            : assets_1.UNCHECKED_RADIO_BUTTON_ICON }), (0, jsx_runtime_1.jsx)(radioButtons_styles_1.RadioButtonLabel, { children: value === null || value === void 0 ? void 0 : value.displayName })] }), (value === null || value === void 0 ? void 0 : value.description) && ((0, jsx_runtime_1.jsx)(radioButtons_styles_1.DescriptionIconWrapper, { showDescription: showDescription, onClick: (e) => {
                                    e.stopPropagation();
                                    toggleDescription(value === null || value === void 0 ? void 0 : value.name);
                                }, children: (0, jsx_runtime_1.jsx)(radioButtons_styles_1.DescriptionIcon, { src: assets_1.DESCRIPTION_ICON }) }))] }), (0, jsx_runtime_1.jsx)(radioButtons_styles_1.DescriptionText, { style: {
                            maxHeight: showDescription ? 'min-content' : 0,
                            opacity: showDescription ? 1 : 0,
                            margin: showDescription ? '0 20px 18px 20px' : '0 20px 0 20px',
                        }, children: (0, i18next_1.t)(value === null || value === void 0 ? void 0 : value.description, constants_1.DESCRIPTION_PLACEHOLDER) })] }, index));
        }) }));
}
exports.default = RadioButtons;
