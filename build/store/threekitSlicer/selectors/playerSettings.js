"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewUpdate = exports.getCurrentModelView = exports.getCurrentMode = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getCurrentMode = (0, memoize_one_1.default)((state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.currentMode; });
exports.getCurrentModelView = (0, memoize_one_1.default)((state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.modelView; });
exports.getViewUpdate = (0, memoize_one_1.default)((state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.viewUpdate; });
