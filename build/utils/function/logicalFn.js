"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldDisableButton = void 0;
const attributesHelperFn_1 = require("./attributesHelperFn");
const functions_1 = require("./functions");
const shouldDisableButton = ({ form, formRequiredAndCheckedFields, currentStep, isCarousel, }) => {
    if (!form)
        return false;
    if ((0, functions_1.isEmptyObj)(formRequiredAndCheckedFields))
        return false;
    let result = false;
    const object = formRequiredAndCheckedFields;
    Object.entries(object).forEach(([attributeName, attributeValue]) => {
        const inputValue = attributeValue;
        const attributeStep = (0, attributesHelperFn_1.getStepNumberByAttributeName)({
            form,
            attributeName,
        });
        if (((isCarousel && currentStep === attributeStep) || !isCarousel) &&
            !inputValue) {
            result = true;
        }
    });
    return result;
};
exports.shouldDisableButton = shouldDisableButton;
