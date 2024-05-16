"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeIndex = exports.assetsRules = exports.getStepNumberByAttributeName = exports.selectionToConfiguration = exports.deflateRgb = exports.setCameraPosition = exports.getCameraPosition = exports.prepAttribute = exports.filterAttributesArray = void 0;
const constants_1 = require("../constants");
const filterAttributesArray = (attributeName, attributes) => {
    const attributesRegExp = typeof attributeName === 'string'
        ? new RegExp(`/${attributeName}/`)
        : attributeName;
    return Array.isArray(attributes)
        ? attributes.filter((el) => attributesRegExp.test(el.name))
        : Object.entries(attributes).reduce((output, [attrName, attr]) => attributesRegExp.test(attrName)
            ? Object.assign(output, { [attrName]: attr })
            : output, {});
};
exports.filterAttributesArray = filterAttributesArray;
const prepAttribute = (attribute) => {
    let prepped = attribute;
    // if (attribute.values[0].metadata[ATTRIBUTE_ORDER_METADATA_KEY]) {
    //     prepped = Object.assign(attribute, {
    //         values: attribute.values.sort(
    //             (a, b) =>
    //                 a.metadata[ATTRIBUTE_ORDER_METADATA_KEY] -
    //                 b.metadata[ATTRIBUTE_ORDER_METADATA_KEY]
    //         ),
    //     });
    // }
    return prepped;
};
exports.prepAttribute = prepAttribute;
const getCameraPosition = (cameraApi) => ({
    position: cameraApi.getPosition(),
    quaternion: cameraApi.getQuaternion(),
});
exports.getCameraPosition = getCameraPosition;
const setCameraPosition = (cameraApi, cameraPosition) => {
    cameraApi.setPosition(cameraPosition.position);
    cameraApi.setQuaternion(cameraPosition.quaternion);
};
exports.setCameraPosition = setCameraPosition;
const deflateRgb = (rgbObj) => {
    return Object.entries(rgbObj).reduce((output, [key, value]) => {
        if (['r', 'g', 'b'].includes(key)) {
            return Object.assign(Object.assign({}, output), { [key]: value / 255 });
        }
        return output;
    }, {});
};
exports.deflateRgb = deflateRgb;
const selectionToConfiguration = (value, attributeType) => {
    if (!value && value !== '')
        return undefined;
    let updated;
    switch (attributeType) {
        case constants_1.ATTRIBUTE_TYPES.number:
            updated = value;
            break;
        case constants_1.ATTRIBUTE_TYPES.asset:
            if (!isNaN(value))
                updated = 'good';
            else
                updated = { assetId: value };
            break;
        case constants_1.ATTRIBUTE_TYPES.string:
            updated = value;
            break;
        case constants_1.ATTRIBUTE_TYPES.color:
            if ('r' in value)
                updated = (0, exports.deflateRgb)(value);
            else
                updated = value;
            break;
        default:
            updated = value;
    }
    return updated;
};
exports.selectionToConfiguration = selectionToConfiguration;
const getStepNumberByAttributeName = ({ form, attributeName, }) => {
    if (!form || !attributeName)
        return undefined;
    let fieldStep;
    Object.values(form).forEach((fields, num) => {
        if (Object.keys(fields).includes(attributeName)) {
            fieldStep = num;
            return;
        }
    });
    return fieldStep;
};
exports.getStepNumberByAttributeName = getStepNumberByAttributeName;
const assetsRules = (asset) => !constants_1.ATTRIBUTE_NAME_TO_HIDE.includes(asset.name);
exports.assetsRules = assetsRules;
const getAttributeIndex = (attributeName) => {
    var _a;
    if (!attributeName)
        return -1;
    const status = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus();
    const validAttributesAndTheirValues = status === null || status === void 0 ? void 0 : status.validAttributesAndTheirValues_typeB;
    const attributeIndex = validAttributesAndTheirValues.findIndex((attr) => (attr === null || attr === void 0 ? void 0 : attr.name) === attributeName);
    return attributeIndex;
};
exports.getAttributeIndex = getAttributeIndex;
