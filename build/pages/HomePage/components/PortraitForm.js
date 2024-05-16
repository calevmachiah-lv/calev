"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const portraitForm_styles_1 = require("./portraitForm.styles");
const Attributes_1 = __importDefault(require("../../../components/Attributes"));
const useSliderBar_1 = __importDefault(require("../../../hooks/useSliderBar"));
const flowSlicer_1 = require("../../../store/flowSlicer");
const react_redux_1 = require("react-redux");
const RecapPage_1 = __importDefault(require("../../RecapPage"));
const FunctionalButtons_1 = __importDefault(require("../../../components/FunctionalButtons"));
const constants_1 = require("../../../utils/constants");
const ProductInfos_1 = __importDefault(require("./ProductInfos"));
const PortraitForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const displayRecap = (0, react_redux_1.useSelector)(flowSlicer_1.getDisplayRecap);
    const { displayTutorial, tutorialStep } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    const formRef = (0, react_1.useRef)(null);
    const [slidePercentsToOpenRecap, setSlidePercentsToOpenRecap] = react_1.default.useState(displayRecap
        ? constants_1.PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE
        : constants_1.PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN);
    const { handleTouchStart, handleTouchMove, handleTouchEnd, openPercentage } = (0, useSliderBar_1.default)({
        onSlideUp: () => {
            dispatch((0, flowSlicer_1.openRecap)(true));
        },
        onSlideDown: () => {
            dispatch((0, flowSlicer_1.closeRecap)(true));
        },
        baseHeightInPX: constants_1.PORTRAIT_FORM_BASE_HEIGHT_IN_PX,
        maxHeightInPX: constants_1.PORTRAIT_FORM_MAX_HEIGHT_IN_PX,
        dragElementRef: formRef,
        slidePercentsToOpen: slidePercentsToOpenRecap,
    });
    const recapOpenPercentage = (0, react_redux_1.useSelector)(flowSlicer_1.getRecapOpenPercentage);
    (0, react_1.useEffect)(() => {
        dispatch((0, flowSlicer_1.setRecapOpenPercentage)(openPercentage));
    }, [openPercentage, dispatch]);
    (0, react_1.useEffect)(() => {
        setSlidePercentsToOpenRecap(displayRecap
            ? constants_1.PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE
            : constants_1.PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN);
    }, [displayRecap]);
    return ((0, jsx_runtime_1.jsxs)(portraitForm_styles_1.FormContainer, { ref: formRef, recap: displayRecap, baseHeightInVH: constants_1.PORTRAIT_FORM_BASE_HEIGHT_IN_PX, maxHeightInVH: constants_1.PORTRAIT_FORM_MAX_HEIGHT_IN_PX, tutorial: displayTutorial, children: [(0, jsx_runtime_1.jsx)(RecapPage_1.default, { show: displayRecap, slidePercentsToOpen: slidePercentsToOpenRecap, handleTouchStart: handleTouchStart, handleTouchMove: handleTouchMove, handleTouchEnd: handleTouchEnd }), (0, jsx_runtime_1.jsxs)(portraitForm_styles_1.FormContentWrapper, { openPercentage: recapOpenPercentage, slidePercentsToClose: slidePercentsToOpenRecap, children: [(0, jsx_runtime_1.jsx)(portraitForm_styles_1.SlideBarContainer, { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: (0, jsx_runtime_1.jsx)(portraitForm_styles_1.SlideBar, {}) }), (0, jsx_runtime_1.jsx)(portraitForm_styles_1.AboveFormContainer, { children: (0, jsx_runtime_1.jsx)(ProductInfos_1.default, {}) }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { tutorialStep: tutorialStep, displayTutorial: displayTutorial }), (0, jsx_runtime_1.jsx)(FunctionalButtons_1.default, {})] })] }));
};
exports.default = PortraitForm;
