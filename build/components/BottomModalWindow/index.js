"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import React, { useCallback, useMemo, useRef, useState } from 'react';
const react_1 = require("react");
const bottomModalWindow_styles_1 = require("./bottomModalWindow.styles");
const assets_1 = require("../../assets");
const threekitHooks_1 = require("../../utils/threekitHooks");
function BottomModalWindow({ show, title, text, heightInVH = 43, }) {
    const modalRef = (0, react_1.useRef)(null);
    const { height: screenHeight } = (0, threekitHooks_1.useWindowSize)();
    const minTopPosition = (0, react_1.useMemo)(() => screenHeight * (1 - heightInVH / 100), [screenHeight, heightInVH]);
    return ((0, jsx_runtime_1.jsxs)(bottomModalWindow_styles_1.BottomModalWindowWrapper, { style: {
            top: show ? `${minTopPosition}px` : '110%',
        }, ref: modalRef, onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)(bottomModalWindow_styles_1.BarLineWrapper, { children: (0, jsx_runtime_1.jsx)(bottomModalWindow_styles_1.BarLine, { src: assets_1.BAR_LINE_ICON }) }), (0, jsx_runtime_1.jsx)(bottomModalWindow_styles_1.BottomModalWindowTitle, { children: title }), (0, jsx_runtime_1.jsx)(bottomModalWindow_styles_1.BottomModalWindowText, { children: text })] }));
}
exports.default = BottomModalWindow;
