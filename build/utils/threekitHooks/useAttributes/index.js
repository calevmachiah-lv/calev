"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const attributesHelperFn_1 = require("../../../utils/function/attributesHelperFn");
const functions_1 = require("../../function/functions");
const useAttributes = (attributes) => {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const attributesFromStore = (0, react_redux_1.useSelector)((0, threekitSlicer_1.getAttributes)());
    const attributesToUse = (_a = Object.values(attributesFromStore)) === null || _a === void 0 ? void 0 : _a.filter((attribute) => attributes.includes(attribute.name));
    if (!attributesToUse)
        return {};
    const dataAndChangeObject = attributesToUse === null || attributesToUse === void 0 ? void 0 : attributesToUse.reduce((acc, attribute) => {
        acc[attribute.name] = {
            data: attributesFromStore === null || attributesFromStore === void 0 ? void 0 : attributesFromStore[attribute === null || attribute === void 0 ? void 0 : attribute.name],
            change: (value) => {
                var _a;
                const chooseValue = ((_a = (0, functions_1.getChooseValue)(attribute === null || attribute === void 0 ? void 0 : attribute.values)) === null || _a === void 0 ? void 0 : _a.assetId) || '';
                const valueToUse = !value ? (chooseValue ? chooseValue : '') : value;
                if (!valueToUse)
                    return;
                const preppedValue = (0, attributesHelperFn_1.selectionToConfiguration)(valueToUse, attribute.type);
                if (!preppedValue && preppedValue !== '')
                    return;
                dispatch((0, threekitSlicer_1.setConfiguration)({ [attribute.name]: preppedValue }));
            },
        };
        return acc;
    }, {});
    dataAndChangeObject.changeAll = (values) => {
        const newConfiguration = Object.keys(values).reduce((acc, key) => {
            var _a;
            const attribute = attributesFromStore[key];
            const chooseValue = ((_a = (0, functions_1.getChooseValue)(attribute === null || attribute === void 0 ? void 0 : attribute.values)) === null || _a === void 0 ? void 0 : _a.assetId) || '';
            const valueToUse = !values[key]
                ? chooseValue
                    ? chooseValue
                    : ''
                : values[key];
            if (!valueToUse)
                return acc;
            const preppedValue = (0, attributesHelperFn_1.selectionToConfiguration)(valueToUse, attribute.type);
            acc[key] = preppedValue;
            return acc;
        }, {});
        dispatch((0, threekitSlicer_1.setConfiguration)(newConfiguration));
    };
    return dataAndChangeObject;
};
exports.default = useAttributes;
