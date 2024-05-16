"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const controller_1 = __importDefault(require("../../../controller"));
const Player2D_styles_1 = require("./Player2D.styles");
const add2DSpin_1 = __importDefault(require("../../Tools/add2DSpin"));
const threekitHooks_1 = require("../../../utils/threekitHooks");
const components_1 = require("../../../components");
const constants_1 = require("../../../utils/constants");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const functions_1 = require("../../../utils/function/functions");
const flowSlicer_1 = require("../../../store/flowSlicer");
const Player2D = ({ height = `calc(100vh - ${constants_1.LANDSCAPE_FORM_MAX_HEIGHT_IN_PX}px)`, width = '100%', border = 'none', cssDisplay, className, isRotable, isLoaded, tutorialData, }) => {
    var _a;
    const playerRef = (0, react_1.useRef)(null);
    const previousAngleValue = (0, react_redux_1.useSelector)(threekitSlicer_1.getLastAngle);
    const { displayTutorial, tutorialStep, tutorialSlideDirection } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    const [_, setRotateModel] = (0, threekitHooks_1.useAttribute)('Rotate Model');
    const [, setToggleButton] = (0, react_1.useState)(true);
    const isFullScreen = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsFullScreen);
    const [lastTapTime, setLastTapTime] = (0, react_1.useState)(0);
    const [lastTapPosition, setLastTapPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const dispatch = (0, react_redux_1.useDispatch)();
    const playerReady = (0, threekitHooks_1.useThreekitInitStatus)();
    const productImageTutorial = tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.productImageURL;
    const handleLastAngle = (0, react_1.useCallback)((lastAngle) => {
        dispatch((0, threekitSlicer_1.setLastAngle)(lastAngle));
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        if (playerReady) {
            controller_1.default.attachPlayerToComponent(constants_1.TK_PLAYER_DIV_ID_2D);
        }
    }, [playerReady]);
    (0, react_1.useEffect)(() => {
        if (playerReady) {
            const { clientWidth = 0, clientHeight = 0 } = playerRef.current || {};
            dispatch((0, threekitSlicer_1.setPlayerSize)({ width: clientWidth, height: clientHeight }));
        }
    }, [playerReady]);
    (0, react_1.useEffect)(() => {
        if (isRotable) {
            setRotateModel(previousAngleValue);
        }
        else {
            setRotateModel('0');
        }
        if (playerReady) {
            (0, add2DSpin_1.default)({ attributeId: constants_1.TK_PLAYER_ATTRIBUTE_ID }, handleLastAngle, isRotable, isFullScreen, setToggleButton, changeZoom);
        }
    }, [playerReady, isRotable, isFullScreen]);
    const handleDoubleTap = (event) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;
        const currentPosition = (0, functions_1.getEventPosition)(event);
        if (tapLength < 500 &&
            tapLength > 0 &&
            (0, functions_1.isWithinTapArea)(lastTapPosition, currentPosition, 15)) {
            changeZoom();
        }
        setLastTapTime(currentTime);
        setLastTapPosition(Object.assign(Object.assign({}, lastTapPosition), currentPosition));
    };
    const changeZoom = () => {
        dispatch((0, threekitSlicer_1.setViewUpdate)(true));
        if (isFullScreen) {
            while (document.getElementById(constants_1.TK_PLAYER_DIV_ID_2D).style.pointerEvents !==
                'none') {
                document
                    .getElementById(constants_1.TK_PLAYER_DIV_ID_2D)
                    .style.setProperty('pointer-events', 'none');
            }
            dispatch((0, threekitSlicer_1.setPlayerLoading)(true));
            setTimeout(() => {
                if (document.getElementById(constants_1.TK_PLAYER_DIV_ID_2D).style.pointerEvents ===
                    'none') {
                    (0, functions_1.addOpacityAnimation)(constants_1.TK_PLAYER_DIV_ID_2D, 100);
                    document
                        .getElementById(constants_1.TK_PLAYER_DIV_ID_2D)
                        .style.removeProperty('pointer-events');
                    dispatch((0, threekitSlicer_1.setIsFullScreen)(!isFullScreen));
                    dispatch((0, threekitSlicer_1.setPlayerLoading)(false));
                }
            }, 50);
            setTimeout(() => {
                dispatch((0, threekitSlicer_1.setViewUpdate)(false));
            }, 1000);
            return;
        }
        dispatch((0, threekitSlicer_1.setIsFullScreen)(!isFullScreen));
        setTimeout(() => {
            dispatch((0, threekitSlicer_1.setViewUpdate)(false));
        }, 1000);
    };
    const newClassName = `${constants_1.DEFAULT_CLASS_NAME} ${constants_1.CLASS_NAME_PREFIX}-player ${className}`;
    return ((0, jsx_runtime_1.jsxs)(Player2D_styles_1.Wrapper, { className: newClassName, height: height, width: width, border: border, isRotable: isRotable, conditionalCSS: cssDisplay, ref: playerRef, fullScreen: isFullScreen, displayTutorial: displayTutorial, children: [(0, jsx_runtime_1.jsx)("div", { id: constants_1.TK_PLAYER_DIV_ID_2D, onDoubleClick: changeZoom, onTouchEnd: (e) => handleDoubleTap(e) }), productImageTutorial && isLoaded && displayTutorial && ((0, jsx_runtime_1.jsx)(Player2D_styles_1.Picture, { src: productImageTutorial, slideDirection: tutorialSlideDirection })), isLoaded &&
                displayTutorial &&
                ((_a = tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.steps) === null || _a === void 0 ? void 0 : _a.map((item, idx) => {
                    var _a, _b;
                    return idx === tutorialStep ? ((0, jsx_runtime_1.jsx)(Player2D_styles_1.StepPicture, { src: (_b = (_a = tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.steps) === null || _a === void 0 ? void 0 : _a[tutorialStep || 0]) === null || _b === void 0 ? void 0 : _b.imageUrl, slideDirection: tutorialSlideDirection }, idx)) : null;
                })), isLoaded && ((0, jsx_runtime_1.jsx)(components_1.OptionsButton, { buttonName: constants_1.HELPER_BUTTON_LABEL, fnButton: () => dispatch((0, flowSlicer_1.setDisplayTutorial)(!displayTutorial)) }))] }));
};
exports.default = Player2D;
