"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const threekitHooks_1 = require("../../utils/threekitHooks");
function useActiveAttribute() {
    var _a, _b;
    const activeAttribute = (0, react_redux_1.useSelector)(threekitSlicer_1.getActiveAttribute);
    const [attributeData, handleChange] = (0, threekitHooks_1.useAttribute)(activeAttribute);
    const dataDrivenAttributes = (_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.validAttributesAndTheirValues_typeB;
    const selectedValues = (0, react_1.useMemo)(() => {
        if (!(attributeData === null || attributeData === void 0 ? void 0 : attributeData.groupName))
            return [attributeData === null || attributeData === void 0 ? void 0 : attributeData.values.find((value) => value === null || value === void 0 ? void 0 : value.selected)];
        else {
            const attributesInGroup = dataDrivenAttributes === null || dataDrivenAttributes === void 0 ? void 0 : dataDrivenAttributes.filter((attribute) => attribute.groupName === attributeData.groupName);
            const selected = attributesInGroup === null || attributesInGroup === void 0 ? void 0 : attributesInGroup.map((attribute) => attribute.values.find((value) => value === null || value === void 0 ? void 0 : value.selected));
            return selected;
        }
    }, [attributeData, dataDrivenAttributes]);
    return { attributeData, selectedValues, handleChange, activeAttribute };
}
exports.default = useActiveAttribute;
