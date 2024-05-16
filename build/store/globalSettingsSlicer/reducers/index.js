"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStep = exports.setGlobalSettingsParams = exports.setGlobalSettings = void 0;
const constants_1 = require("../../../utils/constants");
const setGlobalSettings = (state, action) => {
    return action.payload;
};
exports.setGlobalSettings = setGlobalSettings;
const setGlobalSettingsParams = (state, action) => {
    state.params = action.payload;
    state.params.token = action.payload.token
        ? encodeURIComponent(action.payload.token)
        : '';
};
exports.setGlobalSettingsParams = setGlobalSettingsParams;
const setStep = (state, action) => {
    state.step = action.payload;
};
exports.setStep = setStep;
