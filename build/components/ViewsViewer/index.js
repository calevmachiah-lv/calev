"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const viewsViewer_styles_1 = require("./viewsViewer.styles");
const assets_1 = require("../../assets");
const useSwipe_1 = __importDefault(require("../../hooks/useSwipe"));
const constants_1 = require("../../utils/constants");
const flowSlicer_1 = require("../../store/flowSlicer");
const react_redux_1 = require("react-redux");
function ViewsViewer({ data, isMobile, isHelper }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { tutorialStep } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    const tutorialDataLength = data === null || data === void 0 ? void 0 : data.length;
    const previousIndex = (0, react_1.useCallback)(() => {
        if (tutorialStep > 0) {
            dispatch((0, flowSlicer_1.setTutorialStep)(tutorialStep - 1));
            dispatch((0, flowSlicer_1.setTutorialSlideDirection)('prev'));
        }
    }, [tutorialStep, dispatch]);
    const nextIndex = (0, react_1.useCallback)(() => {
        if (tutorialStep < tutorialDataLength - 1) {
            dispatch((0, flowSlicer_1.setTutorialStep)(tutorialStep + 1));
            dispatch((0, flowSlicer_1.setTutorialSlideDirection)('next'));
        }
    }, [tutorialStep, tutorialDataLength, dispatch]);
    const { handleTouchStart, handleTouchEnd } = (0, useSwipe_1.default)(previousIndex, nextIndex, 100);
    (0, react_1.useEffect)(() => {
        const tuturialDiv = document.getElementById(constants_1.HOME_CONTAINER);
        if (!tuturialDiv)
            return;
        tuturialDiv.addEventListener('touchstart', handleTouchStart, false);
        tuturialDiv.addEventListener('touchend', handleTouchEnd, false);
        return () => {
            tuturialDiv.removeEventListener('touchstart', handleTouchStart, false);
            tuturialDiv.removeEventListener('touchend', handleTouchEnd, false);
        };
    }, [handleTouchStart, handleTouchEnd]);
    return isMobile ? ((0, jsx_runtime_1.jsx)(viewsViewer_styles_1.ViewDotsContainer, { children: data === null || data === void 0 ? void 0 : data.map((view, key) => ((0, jsx_runtime_1.jsx)(viewsViewer_styles_1.ViewDot, { isHelper: isHelper, isActive: tutorialStep === key, onClick: () => dispatch((0, flowSlicer_1.setTutorialStep)(key)) }, key))) })) : ((data === null || data === void 0 ? void 0 : data.length) > 0 && ((0, jsx_runtime_1.jsxs)(viewsViewer_styles_1.ArrowContainer, { children: [(0, jsx_runtime_1.jsx)(viewsViewer_styles_1.Arrow, { onClick: previousIndex, disable: tutorialStep < 1, children: (0, jsx_runtime_1.jsx)("img", { src: assets_1.LEFT_ARROW_SLIDER }) }), (0, jsx_runtime_1.jsx)(viewsViewer_styles_1.Arrow, { onClick: nextIndex, disable: tutorialStep > tutorialDataLength - 2, children: (0, jsx_runtime_1.jsx)("img", { src: assets_1.RIGHT_ARROW_SLIDER }) })] })));
}
exports.default = ViewsViewer;
