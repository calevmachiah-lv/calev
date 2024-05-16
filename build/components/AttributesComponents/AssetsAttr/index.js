"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const assetsAttr_styled_1 = require("./assetsAttr.styled");
const react_redux_1 = require("react-redux");
const selectors_1 = require("../../../store/globalSettingsSlicer/selectors");
const assets_1 = require("../../../assets");
const ToolTip_1 = __importDefault(require("../../ToolTip"));
const constants_1 = require("../../../utils/constants");
const attributesHelperFn_1 = require("../../../utils/function/attributesHelperFn");
const AttributeItemsComponent = ({ attributeItems, handleChange, realSize, selectedValue, appName, isDesktop, noImage = false }) => {
    const [descriptionOpened, setDescriptionOpened] = (0, react_1.useState)(null);
    const toggleDescription = (0, react_1.useCallback)((name) => {
        if (descriptionOpened === name) {
            setDescriptionOpened(null);
        }
        else {
            setDescriptionOpened(name);
        }
    }, [descriptionOpened]);
    const handleMouseEnterDescription = (0, react_1.useCallback)((e, value) => {
        toggleDescription(value);
        const targetBounding = e.target.getBoundingClientRect();
        const itemEl = document.getElementById(`item-${value}`);
        const tooltipEl = document.getElementById(`tooltip-${value}`);
        const tooltipArrowEl = document.getElementById(`tooltipArrow-${value}`);
        const itemElHeight = (itemEl === null || itemEl === void 0 ? void 0 : itemEl.clientHeight) || 0;
        const tooltipElHeight = (tooltipEl === null || tooltipEl === void 0 ? void 0 : tooltipEl.clientHeight) || 0;
        const tooltipArrowElHeight = (tooltipArrowEl === null || tooltipArrowEl === void 0 ? void 0 : tooltipArrowEl.offsetHeight) || (tooltipArrowEl === null || tooltipArrowEl === void 0 ? void 0 : tooltipArrowEl.clientHeight) || 0;
        const updatedTop = targetBounding.top +
            targetBounding.height -
            tooltipArrowElHeight -
            tooltipElHeight -
            itemElHeight;
        if (tooltipEl) {
            tooltipEl.style.top = updatedTop + constants_1.MEASURE_UNIT;
        }
        if (tooltipArrowEl) {
            tooltipArrowEl.style.top = updatedTop + tooltipElHeight + constants_1.MEASURE_UNIT;
        }
    }, [toggleDescription]);
    const showDescriptionTooltip = (0, react_1.useMemo)(() => {
        return appName === constants_1.OOB_APPNAME && isDesktop && realSize === constants_1.BIG_SIZE_LABEL;
    }, [appName, isDesktop, realSize]);
    return attributeItems.map((item, index) => {
        var _a;
        const value = item === null || item === void 0 ? void 0 : item.assetId;
        const isToneOnToneStyle = (item === null || item === void 0 ? void 0 : item.name.toLowerCase()) === 'tone on tone' ||
            (item === null || item === void 0 ? void 0 : item.name.toLowerCase()) === 'ton sur ton';
        const backgroudToDisplay = (item === null || item === void 0 ? void 0 : item.thumbnailPath) || (item === null || item === void 0 ? void 0 : item.thumbnailColor);
        const backgroundImageKind = backgroudToDisplay === null || backgroudToDisplay === void 0 ? void 0 : backgroudToDisplay.includes('https');
        const showDescription = descriptionOpened === value;
        return ((0, jsx_runtime_1.jsxs)(assetsAttr_styled_1.ItemWrapper, { onClick: () => handleChange(value), id: `item-${value}`, children: [backgroudToDisplay ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ContainerStyle, { selected: selectedValue === value, size: realSize, children: (0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemImg, { backgroudToDisplay: backgroudToDisplay, backgroundImageKind: backgroundImageKind, selected: selectedValue === value, isToneOnTone: isToneOnToneStyle }) }), (0, jsx_runtime_1.jsxs)(assetsAttr_styled_1.ItemNameWrapper, { onMouseEnter: (e) => showDescriptionTooltip
                                ? handleMouseEnterDescription(e, value)
                                : null, onMouseLeave: () => showDescriptionTooltip ? toggleDescription(value) : null, children: [(0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemName, { children: item === null || item === void 0 ? void 0 : item.displayName }), showDescriptionTooltip && (item === null || item === void 0 ? void 0 : item.description) && ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.DescriptionIconWrapper, { children: (0, jsx_runtime_1.jsx)(assetsAttr_styled_1.DescriptionIcon, { src: assets_1.DESCRIPTION_ICON }) }))] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemNoImg, { selected: selectedValue === value, size: realSize, isImage: noImage, children: noImage ? (_a = item === null || item === void 0 ? void 0 : item.displayName) === null || _a === void 0 ? void 0 : _a.charAt(0) : item === null || item === void 0 ? void 0 : item.displayName }), noImage && ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemName, { children: item === null || item === void 0 ? void 0 : item.displayName })), showDescriptionTooltip && (item === null || item === void 0 ? void 0 : item.description) && ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.DescriptionIconWrapper, { onMouseEnter: (e) => handleMouseEnterDescription(e, value), onMouseLeave: () => toggleDescription(value), children: (0, jsx_runtime_1.jsx)(assetsAttr_styled_1.DescriptionIcon, { src: assets_1.DESCRIPTION_ICON }) }))] })), showDescriptionTooltip && (item === null || item === void 0 ? void 0 : item.description) && ((0, jsx_runtime_1.jsx)(ToolTip_1.default, { show: showDescription, title: (item === null || item === void 0 ? void 0 : item.displayName) || constants_1.TITLE_PLACEHOLDER, text: (item === null || item === void 0 ? void 0 : item.description) || constants_1.DESCRIPTION_PLACEHOLDER, backgroudToDisplay: backgroudToDisplay, id: value }))] }, index));
    });
};
function AssetsAttr({ attribute, size = constants_1.SMALL_SIZE_LABEL, insideOptionalGroup, validValues, noImage }) {
    let { appName } = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const { isMobile, isDesktop } = (0, threekitHooks_1.useWindowSize)();
    const [attributeData, handleChange] = (0, threekitHooks_1.useAttribute)(attribute.name);
    const selectedValue = (0, react_1.useMemo)(() => { var _a; return (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) === null || _a === void 0 ? void 0 : _a.assetId; }, [attributeData]);
    const [activeFilter, setActiveFilter] = (0, react_1.useState)(0);
    const filtersScroll = (0, react_1.useRef)();
    const isPatchStyle = (0, react_1.useMemo)(() => size === constants_1.PATCH_STYLE_LABEL, [size]);
    const realSize = (0, react_1.useMemo)(() => {
        if (appName === constants_1.OOB_APPNAME && size === constants_1.VERTICAL_SIZE_LABEL) {
            return constants_1.BIG_SIZE_LABEL;
        }
        else if (isPatchStyle) {
            return constants_1.SMALL_SIZE_LABEL;
        }
        else {
            return size;
        }
    }, [size, appName, isPatchStyle]);
    const valuesByFilters = (0, react_1.useMemo)(() => {
        var _a, _b;
        const assetsMap = new Map((_a = attribute === null || attribute === void 0 ? void 0 : attribute.values) === null || _a === void 0 ? void 0 : _a.filter((el) => el.type === 'item').map((asset) => [asset.assetId, asset]));
        const isFiltered = ((_b = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _b === void 0 ? void 0 : _b.isFiltered) === 'true';
        const valuesByFilters = {};
        if (isFiltered) {
            validValues.forEach((value) => {
                var _a;
                value = Object.assign(Object.assign({}, value), assetsMap.get(value === null || value === void 0 ? void 0 : value.assetId));
                const filter = ((_a = value === null || value === void 0 ? void 0 : value.metadata) === null || _a === void 0 ? void 0 : _a.filter) || 'Other';
                if (!valuesByFilters[filter]) {
                    valuesByFilters[filter] = [];
                }
                valuesByFilters[filter].push(value);
            });
        }
        return valuesByFilters;
    }, [validValues, attribute]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (selectedValue === '' && (0, attributesHelperFn_1.getAttributeIndex)(attributeData === null || attributeData === void 0 ? void 0 : attributeData.name) === 0) {
            handleChange((_b = (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.values) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.assetId);
        }
    }, [handleChange, selectedValue, attributeData]);
    (0, react_1.useEffect)(() => {
        if (filtersScroll.current) {
            const child = filtersScroll.current.children[activeFilter];
            if (child instanceof HTMLElement) {
                const scrollOptions = {
                    left: child.offsetLeft,
                    behavior: 'smooth',
                };
                filtersScroll.current.scrollTo(scrollOptions);
            }
        }
    }, [activeFilter, isMobile]);
    const filtersComponent = (0, react_1.useMemo)(() => {
        var _a;
        const isFiltered = ((_a = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _a === void 0 ? void 0 : _a.isFiltered) === 'true';
        if (isFiltered) {
            return ((0, jsx_runtime_1.jsxs)(assetsAttr_styled_1.FiltersComponentWrapper, { children: [Object.keys(valuesByFilters).length > 1 && ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.FiltersTitlesWrapper, { children: Object.keys(valuesByFilters).map((filter, index) => ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.FilterTitle, { onClick: () => {
                                setActiveFilter(index);
                            }, isActive: index === activeFilter, children: filter }, index))) })), (0, jsx_runtime_1.jsx)(assetsAttr_styled_1.FiltersWrapper, { children: Object.values(valuesByFilters).map((attributeItems, index) => {
                            return index === activeFilter ? ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemsWrapper, { size: realSize, insideOptionalGroup: insideOptionalGroup, isActiveFilter: index === activeFilter, children: (0, jsx_runtime_1.jsx)(AttributeItemsComponent, { attributeItems: attributeItems || [], handleChange: handleChange, realSize: realSize, selectedValue: selectedValue, appName: appName, isDesktop: isDesktop, isPatch: isPatchStyle, noImage: noImage }) }, index)) : null;
                        }) })] }));
        }
        else {
            return null;
        }
    }, [
        realSize,
        valuesByFilters,
        activeFilter,
        setActiveFilter,
        handleChange,
        selectedValue,
        appName,
        isDesktop,
        insideOptionalGroup,
        isPatchStyle,
        attribute,
    ]);
    const finalComponent = (0, react_1.useMemo)(() => {
        if (filtersComponent) {
            return filtersComponent;
        }
        else {
            return ((0, jsx_runtime_1.jsx)(assetsAttr_styled_1.ItemsWrapper, { size: realSize, insideOptionalGroup: insideOptionalGroup, children: (0, jsx_runtime_1.jsx)(AttributeItemsComponent, { attributeItems: validValues || [], handleChange: handleChange, realSize: realSize, selectedValue: selectedValue, appName: appName, isDesktop: isDesktop, noImage: noImage }) }));
        }
    }, [
        filtersComponent,
        validValues,
        realSize,
        handleChange,
        selectedValue,
        appName,
        isDesktop,
        insideOptionalGroup,
        noImage
    ]);
    return finalComponent;
}
exports.default = AssetsAttr;
