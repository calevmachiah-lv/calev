"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const threekitHooks_1 = require("../../utils/threekitHooks");
function useReadableConfiguration(attributes) {
    var _a;
    const [readableConfiguration, setReadableConfiguration] = (0, react_1.useState)({});
    const { getIsAttributeValid } = (0, threekitHooks_1.useValidAttributes)();
    (0, react_1.useEffect)(() => {
        var _a;
        const getReadableConfiguration = () => {
            var _a;
            const configuration = (_a = window === null || window === void 0 ? void 0 : window.threekit) === null || _a === void 0 ? void 0 : _a.controller.getReadableConfiguration();
            delete configuration['_SKU'];
            const result = {};
            Object.entries(configuration).forEach(([attributeName, value]) => {
                var _a;
                if (!getIsAttributeValid(attributeName))
                    return;
                const defaultValue = (_a = attributes === null || attributes === void 0 ? void 0 : attributes[attributeName]) === null || _a === void 0 ? void 0 : _a.defaultValue;
                result[attributeName] = Object.assign(Object.assign({}, value), { attributeType: defaultValue === ''
                        ? 'text'
                        : value.thumbnailPath || value.thumbnail
                            ? 'asset'
                            : 'text' });
            });
            return result;
        };
        if (!((_a = window === null || window === void 0 ? void 0 : window.threekit) === null || _a === void 0 ? void 0 : _a.controller.getReadableConfiguration))
            return;
        const configuration = getReadableConfiguration();
        setReadableConfiguration(configuration);
    }, [attributes, (_a = window === null || window === void 0 ? void 0 : window.threekit) === null || _a === void 0 ? void 0 : _a.controller.getReadableConfiguration]);
    return readableConfiguration;
}
exports.default = useReadableConfiguration;
