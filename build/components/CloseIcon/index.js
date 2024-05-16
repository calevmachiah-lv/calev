"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const assets_1 = require("../../assets");
const closeIcon_styles_1 = require("./closeIcon.styles");
function CloseIcon({ onClick, css = {}, }) {
    return (0, jsx_runtime_1.jsx)(closeIcon_styles_1.Icon, { src: assets_1.CLOSE_ICON_BLACK, onClick: onClick, style: css });
}
exports.default = CloseIcon;
