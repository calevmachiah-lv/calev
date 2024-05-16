"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryButtons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../utils/constants");
const OptionsButton_1 = __importDefault(require("../Form/OptionsButton"));
const SummaryButtons_styles_1 = require("./SummaryButtons.styles");
const SummaryButtons = () => {
    return ((0, jsx_runtime_1.jsxs)(SummaryButtons_styles_1.Wrapper, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.ADDTOBAG_BUTTON_LABEL }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.MODIFY_BUTTON_LABEL })] }));
};
exports.SummaryButtons = SummaryButtons;
