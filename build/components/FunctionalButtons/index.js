"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const constants_1 = require("../../utils/constants");
const OptionsButton_1 = __importDefault(require("../Form/OptionsButton"));
const FunctionalButtons_style_1 = require("./FunctionalButtons.style");
const FunctionalButtons = () => {
    var _a, _b;
    const disabledDoneButton = (0, react_1.useMemo)(() => {
        var _a, _b;
        let disabled = true;
        if (!Object.values((_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.attributes).includes('NA')) {
            disabled = false;
        }
        return disabled;
    }, [(_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.attributes]);
    return ((0, jsx_runtime_1.jsxs)(FunctionalButtons_style_1.Wrapper, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.SURPRISE_ME_BUTTON_LABEL }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { disable: disabledDoneButton, buttonName: constants_1.DONE_BUTTON_LABEL })] }));
};
exports.default = FunctionalButtons;
