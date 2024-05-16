"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const react_redux_1 = require("react-redux");
const selectors_1 = require("../../../store/globalSettingsSlicer/selectors");
function useCurrentChosenColor(props) {
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getFormValidAttributes);
    const currentStep = (0, react_redux_1.useSelector)(selectors_1.getStep);
    const groupIndex = (props === null || props === void 0 ? void 0 : props.groupIndex) || (props === null || props === void 0 ? void 0 : props.groupIndex) === 0
        ? props === null || props === void 0 ? void 0 : props.groupIndex
        : currentStep;
    const currentColorData = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d;
        const currentGroup = Object.values(form)[groupIndex];
        if (!currentGroup)
            return {
                currentColorName: '',
                currentColorUrl: '',
            };
        const colorAttribute = Object.values(currentGroup).find((attribute) => attribute.type === 'Asset' && attribute.values.length);
        const currentColorAssetId = (_a = colorAttribute === null || colorAttribute === void 0 ? void 0 : colorAttribute.value) === null || _a === void 0 ? void 0 : _a.assetId;
        const currentColor = (_b = colorAttribute === null || colorAttribute === void 0 ? void 0 : colorAttribute.values) === null || _b === void 0 ? void 0 : _b.find((value) => (value === null || value === void 0 ? void 0 : value.assetId) === currentColorAssetId);
        const currentColorUrl = ((_c = currentColor === null || currentColor === void 0 ? void 0 : currentColor.metadata) === null || _c === void 0 ? void 0 : _c.thumbnailPath) ||
            ((_d = currentColor === null || currentColor === void 0 ? void 0 : currentColor.metadata) === null || _d === void 0 ? void 0 : _d.thumbnail);
        const currentColorName = currentColor === null || currentColor === void 0 ? void 0 : currentColor.name;
        return { currentColorUrl, currentColorName };
    }, [form, groupIndex]);
    const { currentColorUrl, currentColorName } = currentColorData;
    return { currentColorUrl, currentColorName };
}
exports.default = useCurrentChosenColor;
