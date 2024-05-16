"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useWindowSize = () => {
    const [windowSize, setWindowSize] = (0, react_1.useState)({
        width: 0,
        height: 0,
        isMobile: false,
        isIpad: false,
        isDesktop: false,
    });
    const isMobileScreen = (0, react_1.useCallback)(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        return Boolean(userAgent.match(/Android|iPhone|iPod|iPad|WeCom|Opera Mini|IEMobile|WPDesktop|iPad/i));
    }, []);
    const handleResize = (0, react_1.useCallback)(() => {
        const width = Math.max(window.screen.width, window.innerWidth, document.documentElement.clientWidth);
        const height = Math.min(window.screen.height, window.innerHeight, document.documentElement.clientHeight);
        if (isMobileScreen()) {
            setWindowSize((prevWindowSize) => (Object.assign(Object.assign({}, prevWindowSize), { height,
                width, isMobile: height > width, isIpad: (width > 769 && width <= 1024) || (height <= width && width <= 769), isDesktop: width > 1024 })));
        }
        else {
            setWindowSize((prevWindowSize) => (Object.assign(Object.assign({}, prevWindowSize), { height: width > 1024
                    ? height
                    : Math.max(window.screen.height, document.documentElement.clientHeight, window.innerHeight), width, isMobile: width <= 769 || height > width, isIpad: (width > 769 && width <= 1024) || (height <= width && width <= 769), isDesktop: width > 1024 })));
        }
    }, [isMobileScreen]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
    return windowSize;
};
exports.default = useWindowSize;
