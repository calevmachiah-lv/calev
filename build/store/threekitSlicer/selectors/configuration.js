"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadableConfigurationWithAttributeType = exports.getValidAttributesNamesFromDataDriven = exports.getReadableValidAttributesFromDataDriven = exports.getAttributeValues = exports.getActiveAttribute = exports.getAttributes = exports.getIsInStock = exports.getGroupedAttributes = exports.getForm = exports.getTotalSteps = exports.getFormValidAttributes = exports.getSku = exports.getAllAttributes = exports.getProductName = exports.getMetadata = exports.getInitialConfiguration = exports.getProduct = exports.getConfiguration = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
const reselect_1 = require("reselect");
exports.getConfiguration = (0, memoize_one_1.default)((state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration; });
exports.getProduct = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.product; });
exports.getInitialConfiguration = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.initialConfiguration; });
exports.getMetadata = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.metadata; });
exports.getProductName = (0, memoize_one_1.default)((state) => { var _a, _b, _c; return ((_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.ProductName) || ''; });
exports.getAllAttributes = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.attributes; });
exports.getSku = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.dataDrivenConfiguratorExtensionStatus.sku; });
exports.getFormValidAttributes = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.formValidAttributes; });
exports.getTotalSteps = (0, memoize_one_1.default)((state) => { var _a, _b, _c; return (_c = Object === null || Object === void 0 ? void 0 : Object.keys((_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.formValidAttributes)) === null || _c === void 0 ? void 0 : _c.length; });
const getInternalAttributeState = (0, memoize_one_1.default)((state) => {
    if (!state.threekit.settings.isThreekitLoaded)
        return {};
    return state.threekit.configuration.attributes;
});
exports.getForm = (0, reselect_1.createSelector)([exports.getConfiguration], (configuration) => {
    if (!configuration)
        return {};
    return configuration.form;
});
exports.getGroupedAttributes = (0, reselect_1.createSelector)([exports.getConfiguration], (configuration) => {
    if (!configuration)
        return {};
    return configuration.groupedAttributes;
});
exports.getIsInStock = (0, reselect_1.createSelector)([exports.getConfiguration], (configuration) => {
    if (!configuration)
        return {};
    return configuration.isInStock;
});
const getAttributes = (attribute) => (0, reselect_1.createSelector)([getInternalAttributeState], (attributes) => {
    if (!attributes)
        return {};
    if (!attribute)
        return attributes;
    return attributes[attribute] || {};
});
exports.getAttributes = getAttributes;
exports.getActiveAttribute = (0, reselect_1.createSelector)([exports.getConfiguration], (configuration) => {
    if (!configuration)
        return undefined;
    return configuration.activeAttribute;
});
const getAttributeValues = (attributeName) => (0, reselect_1.createSelector)(getInternalAttributeState, (attributes) => {
    var _a;
    if (!attributes || !attributeName)
        return [];
    return ((_a = attributes[attributeName]) === null || _a === void 0 ? void 0 : _a.values) || [];
});
exports.getAttributeValues = getAttributeValues;
const getReadableValidAttributesFromDataDriven = () => {
    var _a, _b;
    const readableValidAttributes = [];
    const status = (_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus();
    if (!status)
        return [];
    const validAttributes = status === null || status === void 0 ? void 0 : status.validAttributesAndTheirValues_typeB;
    for (let validAttribute of validAttributes) {
        if (((_b = validAttribute === null || validAttribute === void 0 ? void 0 : validAttribute.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            validAttribute.children.forEach((child) => {
                readableValidAttributes.push(child);
            });
            continue;
        }
        readableValidAttributes.push(validAttribute);
    }
    return readableValidAttributes;
};
exports.getReadableValidAttributesFromDataDriven = getReadableValidAttributesFromDataDriven;
const getValidAttributesNamesFromDataDriven = () => {
    var _a, _b;
    const validAttributesNames = [];
    const status = (_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus();
    if (!status)
        return [];
    const validAttributes = status === null || status === void 0 ? void 0 : status.validAttributesAndTheirValues_typeB;
    for (let validAttribute of validAttributes) {
        if (validAttribute === null || validAttribute === void 0 ? void 0 : validAttribute.name)
            validAttributesNames.push(validAttribute.name);
        if (((_b = validAttribute === null || validAttribute === void 0 ? void 0 : validAttribute.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            validAttribute.children.forEach((child) => {
                if (child === null || child === void 0 ? void 0 : child.name)
                    validAttributesNames.push(child.name);
            });
        }
    }
    return validAttributesNames;
};
exports.getValidAttributesNamesFromDataDriven = getValidAttributesNamesFromDataDriven;
const getReadableConfigurationWithAttributeType = () => (0, reselect_1.createSelector)(exports.getAllAttributes, (attributes) => {
    if (!attributes)
        return {};
    const readableValidAttributesFromDataDriven = (0, exports.getReadableValidAttributesFromDataDriven)();
    if (!readableValidAttributesFromDataDriven ||
        !readableValidAttributesFromDataDriven.length)
        return {};
    const result = {};
    readableValidAttributesFromDataDriven.forEach((_a) => {
        var _b;
        var { type, displayName } = _a, rest = __rest(_a, ["type", "displayName"]);
        const selected = ((_b = rest === null || rest === void 0 ? void 0 : rest.values) === null || _b === void 0 ? void 0 : _b.find((value) => value === null || value === void 0 ? void 0 : value.selected)) || rest;
        result[displayName] = Object.assign(Object.assign({}, selected), { value: type === 'Asset' ? selected === null || selected === void 0 ? void 0 : selected.displayName : selected === null || selected === void 0 ? void 0 : selected.value, attributeType: (rest === null || rest === void 0 ? void 0 : rest.thumbnailPath) || (rest === null || rest === void 0 ? void 0 : rest.thumbnail) ? 'asset' : 'text' });
    });
    return result;
});
exports.getReadableConfigurationWithAttributeType = getReadableConfigurationWithAttributeType;
