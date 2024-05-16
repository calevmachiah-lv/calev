"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentModeReducers = void 0;
exports.currentModeReducers = {
    setCurrentMode(state, action) {
        if (state.currentMode !== action.payload) {
            state.currentMode = action.payload;
        }
    },
    setCurrentModelView(state, action) {
        if (state.modelView !== action.payload) {
            state.modelView = action.payload;
        }
    },
    setViewUpdate(state, action) {
        state.viewUpdate = action.payload;
    },
};
