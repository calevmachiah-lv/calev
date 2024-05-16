"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const usePlayerLoadingStatus = () => (0, react_redux_1.useSelector)(threekitSlicer_1.isPlayerLoading);
exports.default = usePlayerLoadingStatus;
