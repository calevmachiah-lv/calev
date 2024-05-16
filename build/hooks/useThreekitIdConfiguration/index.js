"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const flowSlicer_1 = require("../../store/flowSlicer");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const threekitHooks_1 = require("../../utils/threekitHooks");
const navigationParams_1 = require("../../utils/function/navigationParams");
const constants_1 = require("../../utils/constants");
const ShowPopUp_1 = require("../../components/PopUp/ShowPopUp");
const PopUpType_1 = require("../../components/PopUp/PopUpType");
const useSavedConfiguration_1 = __importDefault(require("../useSavedConfiguration"));
const functions_1 = require("../../utils/function/functions");
const useStock_1 = __importDefault(require("../useStock"));
function useThreekitIdConfiguration() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const isLoaded = (0, threekitHooks_1.useThreekitInitStatus)();
    const params = (0, navigationParams_1.getParams)();
    const threekitId = (params === null || params === void 0 ? void 0 : params[constants_1.TK_SAVED_CONFIG_PARAM_KEY]) || '';
    const { savedConfigurationData, isLoadingSavedConfigurationData, isErrorSavedConfigurationData, errorSavedConfigurationData, } = (0, useSavedConfiguration_1.default)(threekitId);
    const [savedConfiguration, isConfigurationExists] = (0, react_1.useMemo)(() => [
        (savedConfigurationData === null || savedConfigurationData === void 0 ? void 0 : savedConfigurationData.configuration) || {},
        !(0, functions_1.isEmptyObj)((savedConfigurationData === null || savedConfigurationData === void 0 ? void 0 : savedConfigurationData.configuration) || {}),
    ], [savedConfigurationData]);
    (0, react_1.useEffect)(() => {
        const openPDPRecap = () => {
            dispatch((0, flowSlicer_1.setDisplayTutorial)(false));
            dispatch((0, threekitSlicer_1.setPage)(''));
        };
        if (isConfigurationExists) {
            openPDPRecap();
            dispatch((0, threekitSlicer_1.setConfiguration)(savedConfiguration));
        }
    }, [isConfigurationExists, dispatch, savedConfiguration]);
    const { data: inStockData, isLoading: inStockLoading, isError: inStockError, error: inStockErrorData, } = (0, useStock_1.default)({
        skus: (savedConfigurationData === null || savedConfigurationData === void 0 ? void 0 : savedConfigurationData.skus) || [],
    });
    (0, react_1.useEffect)(() => {
        if (threekitId &&
            isLoaded &&
            !inStockLoading &&
            !inStockError &&
            !(inStockData === null || inStockData === void 0 ? void 0 : inStockData.allSkusAvailable)) {
            (0, ShowPopUp_1.showPopUp)({
                popUpType: PopUpType_1.popUpTypes.outOfStock,
            });
        }
    }, [inStockData, isLoaded]);
}
exports.default = useThreekitIdConfiguration;
