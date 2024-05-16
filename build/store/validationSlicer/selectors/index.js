"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormTextInputFields = exports.getFormWarningMessages = exports.getFormRequiredAndChecked = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getFormRequiredAndChecked = (0, memoize_one_1.default)((state) => {
    return state.validation.form.requiredAndChecked;
});
exports.getFormWarningMessages = (0, memoize_one_1.default)((state) => {
    return state.validation.form.warningMessages;
});
exports.getFormTextInputFields = (0, memoize_one_1.default)((state) => {
    return state.validation.form.textInputFields;
});
