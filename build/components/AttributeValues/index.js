"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const threekitHooks_1 = require("../../utils/threekitHooks");
const attributeValues_styles_1 = require("./attributeValues.styles");
const react_redux_1 = require("react-redux");
const functions_1 = require("../../utils/function/functions");
function AttributeValues({ attributeNames, selectedValues, }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const maxSelections = attributeNames.length;
    const attributesObject = (0, threekitHooks_1.useAttributes)(attributeNames);
    const inStockData = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsInStock);
    const notInStockUnselected = (0, react_redux_1.useSelector)(threekitSlicer_1.getNotInStockUnselected);
    // const { isLoading } = useAvaibility(attributesObject, attributeNames); // TODO: fix it
    const values = (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        return ((_c = (_b = (_a = attributesObject === null || attributesObject === void 0 ? void 0 : attributesObject[attributeNames === null || attributeNames === void 0 ? void 0 : attributeNames[0]]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.filter((v) => !(0, functions_1.isChooseValue)(v))) || [];
    }, [attributesObject, attributeNames]);
    const orderedValues = (0, react_1.useMemo)(() => values === null || values === void 0 ? void 0 : values.sort((a, b) => (inStockData === null || inStockData === void 0 ? void 0 : inStockData[a === null || a === void 0 ? void 0 : a.sku]) === (inStockData === null || inStockData === void 0 ? void 0 : inStockData[b === null || b === void 0 ? void 0 : b.sku])
        ? 0
        : (inStockData === null || inStockData === void 0 ? void 0 : inStockData[a === null || a === void 0 ? void 0 : a.sku])
            ? -1
            : 1), [values, inStockData]);
    const notSelectedAttributes = (0, react_1.useMemo)(() => Object.keys(attributesObject).filter((attributeName) => {
        var _a, _b;
        return (_b = (_a = attributesObject[attributeName].data) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.find((value) => (value === null || value === void 0 ? void 0 : value.selected) && (0, functions_1.isChooseValue)(value));
    }), [attributesObject]);
    const changeAllValues = (0, react_1.useCallback)((values) => {
        attributesObject.changeAll(values.reduce((acc, selectedValue, index) => {
            acc[attributeNames[index]] = (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.assetId) || '';
            console.log(acc);
            return acc;
        }, {}));
    }, [attributesObject, attributeNames]);
    const handleClick = (0, react_1.useCallback)((value) => {
        var _a, _b, _c;
        const indexAlreadySelected = selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.findIndex((selectedValue) => (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.assetId) === (value === null || value === void 0 ? void 0 : value.assetId) && !(0, functions_1.isChooseValue)(value));
        if (maxSelections === 1) {
            const attributeName = attributeNames[0];
            const newValue = indexAlreadySelected > -1 ? '' : value;
            (_a = attributesObject[attributeName]) === null || _a === void 0 ? void 0 : _a.change((newValue === null || newValue === void 0 ? void 0 : newValue.assetId) || '');
        }
        else {
            if (indexAlreadySelected > -1) {
                const newSelectedValues = (_b = [...selectedValues]) === null || _b === void 0 ? void 0 : _b.map((selectedValue) => (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.assetId) === (value === null || value === void 0 ? void 0 : value.assetId) ? '' : selectedValue);
                changeAllValues(newSelectedValues);
            }
            else if (notSelectedAttributes === null || notSelectedAttributes === void 0 ? void 0 : notSelectedAttributes.length) {
                const notSelectedAttribute = notSelectedAttributes[0];
                (_c = attributesObject[notSelectedAttribute]) === null || _c === void 0 ? void 0 : _c.change(value === null || value === void 0 ? void 0 : value.assetId);
            }
            else {
                const newSelectedValues = [...selectedValues];
                newSelectedValues === null || newSelectedValues === void 0 ? void 0 : newSelectedValues.shift();
                newSelectedValues === null || newSelectedValues === void 0 ? void 0 : newSelectedValues.push(value);
                changeAllValues(newSelectedValues);
            }
        }
    }, [
        attributeNames,
        attributesObject,
        notSelectedAttributes,
        selectedValues,
        maxSelections,
        changeAllValues,
    ]);
    const firstInStockValue = (0, react_1.useMemo)(() => orderedValues.find((value) => (inStockData === null || inStockData === void 0 ? void 0 : inStockData[value === null || value === void 0 ? void 0 : value.sku]) !== false), [orderedValues, inStockData]);
    (0, react_1.useEffect)(() => {
        if (!(orderedValues === null || orderedValues === void 0 ? void 0 : orderedValues.length) || !inStockData || notInStockUnselected)
            return;
        selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.forEach((selectedValue) => {
            if ((0, functions_1.isChooseValue)(selectedValue))
                return;
            if ((inStockData === null || inStockData === void 0 ? void 0 : inStockData[selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.sku]) === false) {
                handleClick(firstInStockValue ? firstInStockValue : { assetId: '' });
            }
        });
        dispatch((0, threekitSlicer_1.setNotInStockUnselected)(true));
    }, [
        orderedValues,
        selectedValues,
        handleClick,
        firstInStockValue,
        notInStockUnselected,
        inStockData,
        dispatch,
    ]);
    return ((0, jsx_runtime_1.jsx)(attributeValues_styles_1.AttributeValuesContainer, { children: orderedValues === null || orderedValues === void 0 ? void 0 : orderedValues.map((value) => {
            const isSelected = selectedValues.some((selectedValue) => (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.assetId) && selectedValue.assetId === (value === null || value === void 0 ? void 0 : value.assetId));
            const inStock = (inStockData === null || inStockData === void 0 ? void 0 : inStockData[value === null || value === void 0 ? void 0 : value.sku]) !== false;
            return ((0, jsx_runtime_1.jsx)(attributeValues_styles_1.AttributeValue, { isSelected: isSelected, inStock: inStock, onClick: () => handleClick(value), img: (value === null || value === void 0 ? void 0 : value._thumbnailUrl) ||
                    'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png', children: (0, jsx_runtime_1.jsx)("img", { src: (value === null || value === void 0 ? void 0 : value._thumbnailUrl) ||
                        'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png', alt: value === null || value === void 0 ? void 0 : value.name }) }, value.name || (value === null || value === void 0 ? void 0 : value.label)));
        }) }));
}
exports.default = AttributeValues;
