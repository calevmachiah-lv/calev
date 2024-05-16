"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_redux_1 = require("react-redux");
const i18next_1 = require("i18next");
const threekitHooks_1 = require("../../utils/threekitHooks");
const Tutorial_styles_1 = require("./Tutorial.styles");
const react_1 = require("react");
const ViewsViewer_1 = __importDefault(require("../ViewsViewer"));
const constants_1 = require("../../utils/constants");
const OptionsButton_1 = __importDefault(require("../Form/OptionsButton"));
const flowSlicer_1 = require("../../store/flowSlicer");
const Tutorial = ({ tutorialData }) => {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const stepInfoRef = (0, react_1.useRef)(null);
    const { tutorialStep } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    return ((0, jsx_runtime_1.jsxs)(Tutorial_styles_1.Container, { id: constants_1.TUTORIAL_DIV_ID, children: [(_a = tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.steps) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
                return ((0, jsx_runtime_1.jsxs)(Tutorial_styles_1.StepSlide, { ref: stepInfoRef, isActive: tutorialStep === index, children: [(0, jsx_runtime_1.jsxs)(Tutorial_styles_1.TutorialContainer, { children: [(0, jsx_runtime_1.jsx)(Tutorial_styles_1.StepLabel, { children: `${(0, i18next_1.t)('label.step', { defaultValue: 'Step' })} - 0${index + 1}` }), (item === null || item === void 0 ? void 0 : item.title) && ((0, jsx_runtime_1.jsx)(Tutorial_styles_1.StepTitle, { children: `${(0, i18next_1.t)('label.choice', 'Select your')} ${item === null || item === void 0 ? void 0 : item.title}` }))] }), (0, jsx_runtime_1.jsxs)(Tutorial_styles_1.Wrapper, { children: [(item === null || item === void 0 ? void 0 : item.description) && ((0, jsx_runtime_1.jsx)(Tutorial_styles_1.DescriptionContainer, { children: (0, jsx_runtime_1.jsx)(Tutorial_styles_1.DescriptionText, { children: (0, i18next_1.t)('item?.description', { defaultValue: item === null || item === void 0 ? void 0 : item.description }) }) })), (0, jsx_runtime_1.jsx)(ViewsViewer_1.default, { data: tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.steps, isMobile: isMobile, containerID: constants_1.TUTORIAL_DIV_ID })] })] }, index));
            }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.CLOSE_BUTTON_LABEL, fnButton: () => dispatch((0, flowSlicer_1.setDisplayTutorial)(false)) })] }));
};
exports.default = Tutorial;
