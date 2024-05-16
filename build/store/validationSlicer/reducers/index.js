"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInitialFormTextInputFields = exports.setFormTextInputFields = exports.setFormWarningMessages = exports.setFormRequiredAndChecked = void 0;
const setFormRequiredAndChecked = (state, action) => {
    return Object.assign(Object.assign({}, state), { form: Object.assign(Object.assign({}, state.form), { requiredAndChecked: action.payload }) });
};
exports.setFormRequiredAndChecked = setFormRequiredAndChecked;
const setFormWarningMessages = (state, action) => {
    return Object.assign(Object.assign({}, state), { form: Object.assign(Object.assign({}, state.form), { warningMessages: action.payload }) });
};
exports.setFormWarningMessages = setFormWarningMessages;
const setFormTextInputFields = (state, action) => {
    return Object.assign(Object.assign({}, state), { form: Object.assign(Object.assign({}, state.form), { textInputFields: action.payload }) });
};
exports.setFormTextInputFields = setFormTextInputFields;
const setInitialFormTextInputFields = (state, action) => {
    const textInputFields = state.form.textInputFields;
    return Object.assign(Object.assign({}, state), { form: Object.assign(Object.assign({}, state.form), { textInputFields: Object.assign(Object.assign({}, action.payload), textInputFields) }) });
};
exports.setInitialFormTextInputFields = setInitialFormTextInputFields;
