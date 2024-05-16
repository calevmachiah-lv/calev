"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const attributesHelperFn_1 = require("../../function/attributesHelperFn");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const useAttribute = (attribute) => {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const attributeData = (0, react_redux_1.useSelector)((0, threekitSlicer_1.getAttributes)(attribute));
    if (!attribute || !attributeData || !Object.keys(attributeData).length)
        return [undefined, () => { }];
    const handleChange = (value) => {
        const preppedValue = (0, attributesHelperFn_1.selectionToConfiguration)(value, attributeData.type);
        if (!preppedValue && preppedValue !== '')
            return;
        dispatch((0, threekitSlicer_1.setConfiguration)({ [attribute]: preppedValue }));
    };
    const dataDrivenAttributes = (_a = window.dataDrivenConfiguratorExtension.getStatus()) === null || _a === void 0 ? void 0 : _a.validAttributesAndTheirValues_typeB;
    const mergerAttributes = dataDrivenAttributes === null || dataDrivenAttributes === void 0 ? void 0 : dataDrivenAttributes.reduce((acc, el) => {
        var _a;
        acc[el.name] = el;
        if (((_a = el.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            el.children.forEach((el2) => (acc[el2.name] = el2));
        }
        return acc;
    }, {});
    const newAttributes = Object.assign(Object.assign({}, attributeData), mergerAttributes === null || mergerAttributes === void 0 ? void 0 : mergerAttributes[attribute]);
    return [newAttributes, handleChange];
};
exports.default = useAttribute;
