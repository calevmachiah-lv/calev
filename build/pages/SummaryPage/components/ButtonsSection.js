"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonsSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SummaryPage_styles_1 = require("../SummaryPage.styles");
const OptionsButton_1 = __importDefault(require("../../../components/Form/OptionsButton"));
const constants_1 = require("../../../utils/constants");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const useAvaibility_1 = __importDefault(require("../../../hooks/useAvaibility"));
const ButtonsSection = ({ appName, }) => {
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const { leadTime: leadTimeData } = (0, useAvaibility_1.default)();
    return ((0, jsx_runtime_1.jsxs)(SummaryPage_styles_1.ButtonsContainer, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.EDIT_BUTTON_LABEL }), !(appName === constants_1.CATALOGDESKTOP_APPNAME && !isMobile) ? ((0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.ADDTOBAG_BUTTON_LABEL, leadTime: leadTimeData })) : null] }));
};
exports.ButtonsSection = ButtonsSection;
exports.default = exports.ButtonsSection;
