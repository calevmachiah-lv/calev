"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tooltip_styles_1 = require("./tooltip.styles");
function ToolTip({ show, title, text, backgroudToDisplay, id }) {
    return ((0, jsx_runtime_1.jsxs)(tooltip_styles_1.TooltipWrapper, { show: show, id: `tooltip-${id}`, children: [(0, jsx_runtime_1.jsxs)(tooltip_styles_1.TooltipContent, { children: [(0, jsx_runtime_1.jsxs)(tooltip_styles_1.TooltipHeader, { children: [backgroudToDisplay && (0, jsx_runtime_1.jsx)(tooltip_styles_1.TooltipImage, { src: backgroudToDisplay }), title && (0, jsx_runtime_1.jsx)(tooltip_styles_1.TooltipTitle, { children: title })] }), text && (0, jsx_runtime_1.jsx)(tooltip_styles_1.TooltipText, { children: text })] }), (0, jsx_runtime_1.jsx)(tooltip_styles_1.TooltipArrow, { id: `tooltipArrow-${id}` })] }));
}
exports.default = ToolTip;
