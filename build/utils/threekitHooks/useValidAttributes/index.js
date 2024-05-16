"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const index_1 = require("../../../store/globalSettingsSlicer/index");
function useValidAttributes(attributeName) {
    var _a;
    const dataDrivenStatus = (_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus();
    const validAttributes = (0, react_1.useMemo)(() => {
        return (dataDrivenStatus === null || dataDrivenStatus === void 0 ? void 0 : dataDrivenStatus.validAttributesAndTheirValues_typeB) || [];
    }, [dataDrivenStatus]);
    const dispatch = (0, react_redux_1.useDispatch)();
    const globalSettingsParams = (0, react_redux_1.useSelector)(index_1.getGlobalSettingsParams);
    const sku = (0, react_1.useMemo)(() => {
        const skus = dataDrivenStatus === null || dataDrivenStatus === void 0 ? void 0 : dataDrivenStatus.skus;
        return skus && skus.hasOwnProperty('Code ERP') ? skus['Code ERP'] : '';
    }, [dataDrivenStatus]);
    (0, react_1.useEffect)(() => {
        if (sku.toString() !== '') {
            dispatch((0, index_1.setGlobalSettingsParams)(Object.assign(Object.assign({}, globalSettingsParams), { sku })));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // NOTE: potential circular dependency if we add globalSettingsParams.
        // there is maybe a solution for this.
    }, [dispatch, sku]);
    const getIsAttributeValid = (0, react_1.useCallback)((attributeNameParam) => {
        const attributeNameToCheck = attributeNameParam || attributeName;
        if (attributeNameToCheck) {
            return validAttributes === null || validAttributes === void 0 ? void 0 : validAttributes.some((attribute) => {
                var _a;
                return ((attribute === null || attribute === void 0 ? void 0 : attribute.name) === attributeNameToCheck ||
                    ((_a = attribute === null || attribute === void 0 ? void 0 : attribute.children) === null || _a === void 0 ? void 0 : _a.some((child) => (child === null || child === void 0 ? void 0 : child.name) === attributeNameToCheck)));
            });
        }
    }, [attributeName, validAttributes]);
    const isAttributeValid = (0, react_1.useMemo)(() => {
        if (attributeName)
            return getIsAttributeValid();
    }, [getIsAttributeValid, attributeName]);
    const currentAttribute = (0, react_1.useMemo)(() => {
        if (attributeName) {
            const attr = validAttributes === null || validAttributes === void 0 ? void 0 : validAttributes.find((attribute) => {
                return (attribute === null || attribute === void 0 ? void 0 : attribute.name) === attributeName;
            });
            if (attr)
                return attr;
            else {
                let currChild;
                validAttributes === null || validAttributes === void 0 ? void 0 : validAttributes.forEach((attribute) => {
                    var _a;
                    (_a = attribute === null || attribute === void 0 ? void 0 : attribute.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
                        if ((child === null || child === void 0 ? void 0 : child.name) === attributeName)
                            currChild = child;
                    });
                });
                return currChild;
            }
        }
    }, [attributeName, validAttributes]);
    const attributeValidValues = (0, react_1.useMemo)(() => {
        if (attributeName) {
            const attributeValidValues = currentAttribute === null || currentAttribute === void 0 ? void 0 : currentAttribute.values;
            return attributeValidValues;
        }
    }, [attributeName, currentAttribute]);
    const isValueValid = (0, react_1.useCallback)((value) => {
        return attributeValidValues === null || attributeValidValues === void 0 ? void 0 : attributeValidValues.some((attribute) => {
            return (attribute === null || attribute === void 0 ? void 0 : attribute.name) === value;
        });
    }, [attributeValidValues]);
    const toReturn = (0, react_1.useMemo)(() => {
        if (attributeName)
            return isAttributeValid
                ? {
                    isAttributeValid,
                    getIsAttributeValid,
                    validAttributes: attributeValidValues,
                    sku: sku,
                    isValueValid,
                }
                : {
                    getIsAttributeValid,
                    isAttributeValid,
                    validAttributes: [],
                    sku: sku,
                    isValueValid,
                };
        else {
            return {
                getIsAttributeValid,
                validAttributes: validAttributes,
                sku: sku,
            };
        }
    }, [
        validAttributes,
        sku,
        attributeName,
        attributeValidValues,
        isValueValid,
        getIsAttributeValid,
        isAttributeValid,
    ]);
    return toReturn;
}
exports.default = useValidAttributes;
