"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedConfigurationData = void 0;
const memoize_one_1 = __importDefault(require("memoize-one"));
exports.getSavedConfigurationData = (0, memoize_one_1.default)((state) => state.threekit.savedConfigurationData);
