"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const global_1 = require("../../../styles/global");
const constants_1 = require("../../../utils/constants");
function AutoDisappearElement({ children }) {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [timerId, setTimerId] = (0, react_1.useState)(null);
    const handlePointerDown = () => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);
        setTimerId(timer);
    };
    const handlePointerUp = () => {
        if (timerId) {
            clearTimeout(timerId);
            setIsVisible(false);
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerId]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { onTouchStart: handlePointerDown, onMouseDown: handlePointerDown, onTouchEnd: handlePointerUp, onMouseUp: handlePointerUp, onMouseLeave: handlePointerUp, children: children }), isVisible && (0, jsx_runtime_1.jsx)(global_1.Version, { children: constants_1.VERSION })] }));
}
exports.default = AutoDisappearElement;
