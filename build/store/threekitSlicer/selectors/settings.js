"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotInStockUnselected = exports.isPlayerLoading = exports.isThreekitLoaded = exports.getPlayerSize = exports.getIsChina = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getIsChina = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.isChina; });
exports.getPlayerSize = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.playerSize; });
exports.isThreekitLoaded = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.isThreekitLoaded; });
exports.isPlayerLoading = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.isPlayerLoading; });
exports.getNotInStockUnselected = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.notInStockUnselected; });
