"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const progressBar_styled_1 = require("./progressBar.styled");
function useProgressBar({ containerId, containerRef, useChildren, useNumbers, currentNumber, totalNumbers, useHeight, isVertical, barWidth = '100%', barHeight = '1px', currentIndex, }) {
    const [progressWidth, setProgressWidth] = (0, react_1.useState)('0%');
    const container = (0, react_1.useMemo)(() => !useNumbers
        ? containerId
            ? document.getElementById(containerId)
            : containerRef === null || containerRef === void 0 ? void 0 : containerRef.current
        : null, [containerId, containerRef, useNumbers]);
    const updateProgress = (0, react_1.useCallback)(() => {
        var _a;
        let progress;
        if (useNumbers && currentNumber && totalNumbers) {
            progress = (currentNumber / totalNumbers) * 100;
        }
        else if (useChildren) {
            const containerChildrenLength = (_a = container === null || container === void 0 ? void 0 : container.children) === null || _a === void 0 ? void 0 : _a.length;
            progress = (((currentIndex || 0) + 1) / containerChildrenLength) * 100;
        }
        else {
            const containerWidth = useHeight
                ? container === null || container === void 0 ? void 0 : container.scrollHeight
                : container === null || container === void 0 ? void 0 : container.scrollWidth;
            const displayWidth = useHeight
                ? container === null || container === void 0 ? void 0 : container.offsetHeight
                : container === null || container === void 0 ? void 0 : container.offsetWidth;
            if (containerWidth <= displayWidth) {
                progress = 100;
            }
            else {
                const scrollLeft = useHeight
                    ? container === null || container === void 0 ? void 0 : container.scrollTop
                    : container === null || container === void 0 ? void 0 : container.scrollLeft;
                progress = (scrollLeft / (containerWidth - displayWidth)) * 100;
            }
        }
        setProgressWidth(progress + '%');
    }, [
        container,
        useHeight,
        currentIndex,
        useChildren,
        currentNumber,
        totalNumbers,
        useNumbers,
    ]);
    (0, react_1.useEffect)(() => {
        if (useNumbers)
            return;
        updateProgress();
        container === null || container === void 0 ? void 0 : container.addEventListener('scroll', updateProgress);
        return () => {
            container === null || container === void 0 ? void 0 : container.removeEventListener('scroll', updateProgress);
        };
    }, [
        currentIndex,
        container,
        useHeight,
        useChildren,
        updateProgress,
        useNumbers,
    ]);
    (0, react_1.useEffect)(() => {
        if (!useNumbers)
            return;
        updateProgress();
    }, [currentNumber]);
    return ((0, jsx_runtime_1.jsx)(progressBar_styled_1.Wrapper, { progressPercents: progressWidth, isVertical: isVertical, barWidth: barWidth, barHeight: barHeight }));
}
exports.default = useProgressBar;
