"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const constants_1 = require("../../utils/constants");
function usePageTitle({ page }) {
    const isChina = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsChina);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        const title = isChina ? (_a = constants_1.PAGES_TITLES[page]) === null || _a === void 0 ? void 0 : _a.zh : (_b = constants_1.PAGES_TITLES[page]) === null || _b === void 0 ? void 0 : _b.en;
        if (title)
            document.title = title;
    }, [page, isChina]);
}
exports.default = usePageTitle;
