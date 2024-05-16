"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastAngle = exports.getPreviousCamera = exports.getHasPatch = exports.getIsFullScreen = exports.getPlayer3DImage = exports.getPage = exports.getPlaceHolderError = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getPlaceHolderError = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.placeHolderError; });
exports.getPage = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.page; });
exports.getPlayer3DImage = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.player3DImage; });
exports.getIsFullScreen = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.isFullScreen; });
exports.getHasPatch = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.hasPatch; });
exports.getPreviousCamera = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.previousCamera; });
exports.getLastAngle = (0, memoize_one_1.default)((state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.threekit) === null || _a === void 0 ? void 0 : _a.productPage) === null || _b === void 0 ? void 0 : _b.lastAngle; });
