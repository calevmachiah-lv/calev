"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const i18next_1 = require("i18next");
const threekitHooks_1 = require("../../../../utils/threekitHooks");
const groupHeading_styled_1 = require("./groupHeading.styled");
const threekitHooks_2 = require("../../../../utils/threekitHooks");
const assets_1 = require("../../../../assets");
function GroupHeading({ title, isActive, handleClick, groupIndex, }) {
    const { currentColorUrl, currentColorName } = (0, threekitHooks_1.useCurrentChosenColor)({
        groupIndex,
    });
    const { isMobile } = (0, threekitHooks_2.useWindowSize)();
    return ((0, jsx_runtime_1.jsxs)(groupHeading_styled_1.HeadingWrapper, { isActive: isActive, onClick: handleClick, children: [(0, jsx_runtime_1.jsx)(groupHeading_styled_1.WrapperAtr, { children: (0, jsx_runtime_1.jsx)(groupHeading_styled_1.HeadingTitle, { children: title }) }), (0, jsx_runtime_1.jsxs)(groupHeading_styled_1.WrapperAtr, { children: [(0, jsx_runtime_1.jsxs)(groupHeading_styled_1.ColorNameWrapper, { children: [(0, jsx_runtime_1.jsx)(groupHeading_styled_1.ValueTitle, { children: currentColorName && (0, i18next_1.t)(currentColorName, currentColorName) }), currentColorUrl && (0, jsx_runtime_1.jsx)(groupHeading_styled_1.ChosenColor, { src: currentColorUrl })] }), !isMobile ? ((0, jsx_runtime_1.jsx)(groupHeading_styled_1.IconStyle, { src: isActive ? assets_1.MINUS_ICON : assets_1.PLUS_ICON }, "icon")) : null] })] }));
}
exports.default = GroupHeading;
