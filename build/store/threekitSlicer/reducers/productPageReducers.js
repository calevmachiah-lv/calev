"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPageReducers = void 0;
exports.productPageReducers = {
    setLastAngle(state, action) {
        if (state.productPage.lastAngle !== action.payload) {
            state.productPage.lastAngle = action.payload;
        }
    },
    setIsFullScreen(state, action) {
        if (state.productPage.isFullScreen !== action.payload) {
            state.productPage.isFullScreen = action.payload;
        }
    },
    setPage(state, action) {
        if (state.productPage.page !== action.payload) {
            state.productPage.page = action.payload;
        }
    },
};
