"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRecap = exports.openRecap = exports.setTutorialStepsNumber = exports.setRecapOpenPercentage = exports.setDisplayRecap = exports.setTutorialSlideDirection = exports.setTutorialStep = exports.setDisplayTutorial = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const flowReducers = __importStar(require("./reducers"));
const initialState = {
    tutorial: {
        displayTutorial: true,
        tutorialStep: 0,
        tutorialStepsNumber: 0,
        tutorialSlideDirection: 'next',
    },
    recap: {
        displayRecap: false,
        recapOpenPercentage: 0,
    },
};
const flowSlice = (0, toolkit_1.createSlice)({
    name: 'flowSlice',
    initialState,
    reducers: flowReducers,
});
_a = flowSlice.actions, exports.setDisplayTutorial = _a.setDisplayTutorial, exports.setTutorialStep = _a.setTutorialStep, exports.setTutorialSlideDirection = _a.setTutorialSlideDirection, exports.setDisplayRecap = _a.setDisplayRecap, exports.setRecapOpenPercentage = _a.setRecapOpenPercentage, exports.setTutorialStepsNumber = _a.setTutorialStepsNumber, exports.openRecap = _a.openRecap, exports.closeRecap = _a.closeRecap;
exports.default = flowSlice.reducer;
__exportStar(require("./reducers"), exports);
__exportStar(require("./selectors"), exports);
