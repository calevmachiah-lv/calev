"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useSwipe = (onSwipePrev, onSwipeNext, sensitivity = 180) => {
    const [startTouch, setStartTouch] = (0, react_1.useState)({
        x: 0,
        y: 0,
        time: 0,
    });
    const handleTouchStart = (0, react_1.useCallback)((event) => {
        const touch = event.touches[0];
        setStartTouch({
            x: touch.clientX,
            y: touch.clientY,
            time: new Date().getTime(),
        });
    }, []);
    const handleTouchEnd = (0, react_1.useCallback)((event) => {
        const touch = event.changedTouches[0];
        const endX = touch.clientX;
        const endTime = new Date().getTime();
        const distanceX = endX - startTouch.x;
        const timeElapsed = endTime - startTouch.time;
        if (Math.abs(distanceX) > sensitivity && timeElapsed < 1000) {
            if (distanceX > 0) {
                onSwipePrev();
            }
            else {
                onSwipeNext();
            }
        }
    }, [onSwipeNext, onSwipePrev, sensitivity, startTouch]);
    return { handleTouchStart, handleTouchEnd };
};
exports.default = useSwipe;
