"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSavedConfiguration = void 0;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const ApiCalls_1 = require("../../utils/ApiCalls/ApiCalls");
const threekitHooks_1 = require("../../utils/threekitHooks");
const useSavedConfiguration = (recipeId) => {
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const queryKey = (0, react_1.useMemo)(() => ['savedConfiguration', recipeId], [recipeId]);
    const { data: savedConfigurationData, isLoading: isLoadingSavedConfigurationData, isError: isErrorSavedConfigurationData, error: errorSavedConfigurationData, } = (0, react_query_1.useQuery)({
        queryKey,
        queryFn: () => (0, ApiCalls_1.getSavedConfig)({ recipeId, isMobile }),
        staleTime: 300000,
        enabled: !!recipeId,
        retry: false,
    });
    return {
        savedConfigurationData,
        isLoadingSavedConfigurationData,
        isErrorSavedConfigurationData,
        errorSavedConfigurationData,
    };
};
exports.useSavedConfiguration = useSavedConfiguration;
exports.default = exports.useSavedConfiguration;
