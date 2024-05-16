"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepAttributeForComponent = exports.getDefaultAttributesValues = exports.updateForm = exports.findAttributeNotRotable = exports.findPlayerMode = exports.findModelPresentationOpen = void 0;
const constants_1 = require("../constants");
const findModelPresentationOpen = (currentGroup) => {
    return Object.values(currentGroup).find((attribute) => { var _a; return ((_a = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _a === void 0 ? void 0 : _a.cameraView) === 'Open'; });
};
exports.findModelPresentationOpen = findModelPresentationOpen;
const findPlayerMode = (currentGroup) => {
    var _a;
    return ((_a = Object.values(currentGroup)) === null || _a === void 0 ? void 0 : _a.find((el) => {
        var _a;
        return (_a = el.values) === null || _a === void 0 ? void 0 : _a.find((attr) => {
            var _a, _b;
            return ((_a = attr.metadata) === null || _a === void 0 ? void 0 : _a.isPlayer3D) === 'true' &&
                (attr === null || attr === void 0 ? void 0 : attr.assetId) === ((_b = el === null || el === void 0 ? void 0 : el.value) === null || _b === void 0 ? void 0 : _b.assetId);
        });
    })) !== undefined
        ? '3D'
        : '2D';
};
exports.findPlayerMode = findPlayerMode;
const findAttributeNotRotable = (currentGroup) => {
    return (Object.values(currentGroup).find((attribute) => { var _a; return ((_a = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _a === void 0 ? void 0 : _a.isRotable) === 'false'; }) !== undefined);
};
exports.findAttributeNotRotable = findAttributeNotRotable;
const updateForm = (form, getIsAttributeValid) => {
    const formValidAttributes = {};
    Object.entries(form).forEach(([key, attributes]) => {
        const validAttributes = {};
        Object.entries(attributes).forEach(([key, attribute]) => {
            if (getIsAttributeValid(attribute.name)) {
                validAttributes[key] = attribute;
            }
        });
        if (Object.keys(validAttributes).length) {
            formValidAttributes[key] = validAttributes;
        }
    });
    return formValidAttributes;
};
exports.updateForm = updateForm;
function getDefaultAttributesValues(attributesData) {
    var _a;
    const defaultAttributesValues = {};
    if (attributesData) {
        (_a = Object.keys(attributesData)) === null || _a === void 0 ? void 0 : _a.forEach((key) => {
            if (attributesData[key].hasOwnProperty('defaultValue') &&
                !key.includes('Object Angle')) {
                defaultAttributesValues[key] = attributesData[key].defaultValue;
            }
        });
    }
    return defaultAttributesValues;
}
exports.getDefaultAttributesValues = getDefaultAttributesValues;
const inflateRgb = (rgbObj) => {
    return Object.entries(rgbObj).reduce((output, [key, value]) => {
        if (['r', 'g', 'b'].includes(key)) {
            return Object.assign(Object.assign({}, output), { [key]: Math.round(255 * (value !== null && value !== void 0 ? value : 0)) });
        }
        return output;
    }, {});
};
const prepAttributeForComponent = (attribute, { metadataKeys, sort }, mode = 'component') => {
    var _a;
    const imgBaseUrl = metadataKeys === null || metadataKeys === void 0 ? void 0 : metadataKeys.imgBaseUrl;
    const thumbnailFromMetadata = metadataKeys === null || metadataKeys === void 0 ? void 0 : metadataKeys.thumbnailFromMetadata;
    const priceFromMetadata = metadataKeys === null || metadataKeys === void 0 ? void 0 : metadataKeys.priceFromMetadata;
    const descriptionFromMetadata = metadataKeys === null || metadataKeys === void 0 ? void 0 : metadataKeys.descriptionFromMetadata;
    const sortKeyFromMetadata = metadataKeys === null || metadataKeys === void 0 ? void 0 : metadataKeys.sortKeyFromMetadata;
    const thumbnailKey = thumbnailFromMetadata ||
        constants_1.METADATA_RESERVED.thumbnailPath ||
        constants_1.METADATA_RESERVED.thumbnail;
    const priceKey = priceFromMetadata || constants_1.METADATA_RESERVED.price;
    const descriptionKey = descriptionFromMetadata || constants_1.METADATA_RESERVED.description;
    const sortKey = sortKeyFromMetadata || constants_1.METADATA_RESERVED.sortKey || 'name';
    let options = attribute.values;
    let selected = attribute.value;
    if (attribute.type === constants_1.ATTRIBUTE_TYPES.arraySelector) {
        options = Object.entries(attribute.values).reduce((output, [assetId, el]) => Object.assign(output, {
            [assetId]: prepCatalogItem(el),
        }), {});
    }
    else if (attribute.type === constants_1.ATTRIBUTE_TYPES.asset) {
        selected = (_a = attribute.value) === null || _a === void 0 ? void 0 : _a.assetId;
        options = attribute.values
            ? attribute.values
                .map((el) => prepCatalogItem(el))
                .sort((a, b) => {
                const fieldA = a[sortKey];
                const fieldB = b[sortKey];
                if (!Object.keys(constants_1.SORT_OPTIONS).includes(sort))
                    return undefined;
                if (sort === constants_1.SORT_OPTIONS.ascending)
                    return fieldA < fieldB ? -1 : 1;
                if (sort === constants_1.SORT_OPTIONS.descending)
                    return fieldA < fieldB ? 1 : -1;
                return undefined;
            })
            : [];
    }
    else if (attribute.type === constants_1.ATTRIBUTE_TYPES.color)
        selected = inflateRgb(attribute.value);
    function prepCatalogItem(item) {
        return Object.assign({}, item, {
            value: item.assetId,
        }, item.metadata[thumbnailKey]
            ? !(imgBaseUrl === null || imgBaseUrl === void 0 ? void 0 : imgBaseUrl.length) &&
                (item.metadata[thumbnailKey].startsWith('#') ||
                    item.metadata[thumbnailKey].startsWith('rgb'))
                ? {
                    colorValue: item.metadata[thumbnailKey],
                }
                : {
                    imageUrl: (imgBaseUrl || '') + item.metadata[thumbnailKey],
                }
            : undefined, item.metadata[priceKey]
            ? {
                price: item.metadata[priceKey],
            }
            : undefined, item.metadata[descriptionKey]
            ? {
                description: item.metadata[descriptionKey],
            }
            : undefined);
    }
    if (mode === 'component')
        return { selected, options };
    return Object.assign(Object.assign({}, attribute), { values: options });
};
exports.prepAttributeForComponent = prepAttributeForComponent;
