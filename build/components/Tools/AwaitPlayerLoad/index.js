"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const __1 = require("../..");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const AwaitPlayerLoad = ({ children }) => {
    const isLoaded = (0, threekitHooks_1.useThreekitInitStatus)();
    const isPlayerLoading = (0, threekitHooks_1.usePlayerLoadingStatus)();
    const currentMode = (0, react_redux_1.useSelector)(threekitSlicer_1.getCurrentMode);
    const playerSize = (0, react_redux_1.useSelector)(threekitSlicer_1.getPlayerSize);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(__1.LVLoader, { display: !isLoaded, isPlayerLoading: isPlayerLoading, currentMode: currentMode, currentSize: playerSize }), children] }));
};
exports.default = AwaitPlayerLoad;
