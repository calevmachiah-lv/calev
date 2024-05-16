"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedConfigurationDataReducers = void 0;
exports.savedConfigurationDataReducers = {
    setSavedConfigurationData(state, action) {
        state.savedConfigurationData = action.payload;
    },
};
