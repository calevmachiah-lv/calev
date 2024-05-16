"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
function useIsFormValid() {
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    return form;
}
exports.default = useIsFormValid;
