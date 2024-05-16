"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popUpPosition = void 0;
const functions_1 = require("../../utils/function/functions");
const popUpPosition = (width, height) => {
    return (0, functions_1.isRightToLeft)()
        ? width < height
            ? { vertical: 'top', horizontal: 'right' }
            : { vertical: 'bottom', horizontal: 'right' }
        : width < height
            ? { vertical: 'top', horizontal: 'left' }
            : { vertical: 'bottom', horizontal: 'left' };
};
exports.popUpPosition = popUpPosition;
