"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAvaibility = void 0;
const useAvaibility = (attributesObject, attributeNames) => {
    return {
        leadTime: { min: 0, max: 5 },
        orderedValues: [0, 5],
        isLoading: false,
        isError: false,
        error: '',
    };
};
exports.useAvaibility = useAvaibility;
exports.default = exports.useAvaibility;
