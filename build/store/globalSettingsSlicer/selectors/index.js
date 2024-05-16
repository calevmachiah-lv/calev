"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStep = exports.getGlobalSettingsParams = exports.getGlobalSettings = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getGlobalSettings = (0, memoize_one_1.default)((state) => state);
exports.getGlobalSettingsParams = (0, memoize_one_1.default)((state) => state.globalSettings.params);
exports.getStep = (0, memoize_one_1.default)((state) => {
    var _a;
    return parseInt((_a = state.globalSettings.step) === null || _a === void 0 ? void 0 : _a.toString(), 10);
});
