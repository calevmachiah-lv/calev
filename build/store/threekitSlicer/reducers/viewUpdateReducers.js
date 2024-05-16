"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUpdateReducers = void 0;
exports.viewUpdateReducers = {
    setViewUpdate(state, action) {
        state.viewUpdate = action.payload;
    },
};
