"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const globalSettingsSlicer_1 = __importDefault(require("./globalSettingsSlicer"));
const threekitSlicer_1 = __importDefault(require("./threekitSlicer"));
const validationSlicer_1 = __importDefault(require("./validationSlicer"));
const flowSlicer_1 = __importDefault(require("./flowSlicer"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        globalSettings: globalSettingsSlicer_1.default,
        threekit: threekitSlicer_1.default,
        validation: validationSlicer_1.default,
        flow: flowSlicer_1.default,
    },
});
