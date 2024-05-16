"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInputDirection = void 0;
const react_1 = require("react");
const functions_1 = require("../../utils/function/functions");
const useInputDirection = ({ inputRef, }) => {
    var _a;
    const value = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value;
    const setRTLDirection = (0, react_1.useCallback)(() => {
        if (inputRef.current) {
            inputRef.current.style.direction = 'rtl';
        }
    }, [inputRef]);
    const setLTRDirection = (0, react_1.useCallback)(() => {
        if (inputRef.current) {
            inputRef.current.style.direction = 'ltr';
        }
    }, [inputRef]);
    (0, react_1.useEffect)(() => {
        if (value) {
            if ((0, functions_1.isRTLCharacter)(value === null || value === void 0 ? void 0 : value[0])) {
                setRTLDirection();
            }
            else {
                setLTRDirection();
            }
        }
    }, [value, inputRef, setRTLDirection, setLTRDirection]);
};
exports.useInputDirection = useInputDirection;
exports.default = exports.useInputDirection;
