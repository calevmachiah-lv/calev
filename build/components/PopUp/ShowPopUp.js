"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPopUp = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const notistack_1 = require("notistack");
const i18next_1 = require("i18next");
const PopupPosition_1 = require("./PopupPosition");
function showPopUp({ popUpType, message, functionOnClose, }) {
    const { popUpMessage, popUpMessageKey, autoHideDuration, preventDuplicate, variant, style, } = popUpType || {};
    const messageToDisplay = message
        ? (0, i18next_1.t)(popUpMessageKey, {
            field: message,
            defaultValue: `${popUpMessage}: ${message}`,
        })
        : (0, i18next_1.t)(popUpMessageKey, popUpMessage);
    if (!messageToDisplay)
        return;
    const width = Math.max(window.screen.width, window.innerWidth, document.documentElement.clientWidth);
    const height = Math.min(window.screen.height, window.innerHeight, document.documentElement.clientHeight);
    const anchorOrigin = (0, PopupPosition_1.popUpPosition)(width, height);
    (0, notistack_1.enqueueSnackbar)((0, i18next_1.t)(messageToDisplay, messageToDisplay), {
        autoHideDuration,
        onClose: functionOnClose ? () => functionOnClose() : undefined,
        preventDuplicate,
        variant,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
        style,
        content: (key, message) => ((0, jsx_runtime_1.jsxs)("div", { style: Object.assign({}, style), children: [style.leftImage && ((0, jsx_runtime_1.jsx)("img", { src: style.leftImage, alt: "Info", style: style.leftImageStyle })), (0, jsx_runtime_1.jsx)("div", { style: {
                        padding: '5px',
                    }, children: message }), (0, jsx_runtime_1.jsx)("div", { onClick: () => (0, notistack_1.closeSnackbar)(key), style: { cursor: 'pointer', fontSize: '18px', width: '100%', maxWidth: '50px', fontWeight: 'bolder' }, children: "\u2715" })] }, key)),
    });
}
exports.showPopUp = showPopUp;
