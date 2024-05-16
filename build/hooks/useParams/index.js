"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useParams = void 0;
const react_query_1 = require("@tanstack/react-query");
const functions_1 = require("../../utils/function/functions");
const constants_1 = require("../../utils/constants");
const useTranslationInitialisation_1 = __importDefault(require("../useTranslationInitialisation"));
const react_1 = require("react");
const threekitHooks_1 = require("../../utils/threekitHooks");
const ApiCalls_1 = require("../../utils/ApiCalls/ApiCalls");
const navigationParams_1 = require("../../utils/function/navigationParams");
const mapping_1 = require("../../utils/function/mapping");
const useParams = () => {
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const params = (0, navigationParams_1.getParams)();
    const { sku, lng, tokenjwt } = params || {};
    const isChina = (params === null || params === void 0 ? void 0 : params.appName) === constants_1.CATALOGWECOM_APPNAME;
    if (tokenjwt) {
        localStorage.setItem('tokenjwt', tokenjwt);
    }
    const { data: config, isLoading: isLoadingConfig, error: errorConfig, } = (0, react_query_1.useQuery)({
        queryKey: ['getConfigVariables'],
        queryFn: () => (0, ApiCalls_1.fetchConfigVariables)(),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        enabled: !!params,
        retry: false,
    });
    const { data: productInfos, isLoading: isLoadingProductId, error: errorProductId, } = (0, react_query_1.useQuery)({
        queryKey: ['product/getCatalogProductBySku', sku],
        queryFn: () => (0, ApiCalls_1.getCatalogProductBySku)({ sku }),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        enabled: !!sku && !!config,
        retry: false,
    });
    (0, react_1.useEffect)(() => {
        if (isChina) {
            (0, functions_1.createScriptIfRequired)();
        }
    }, [isChina]);
    const { errorTranslation } = (0, useTranslationInitialisation_1.default)(config === null || config === void 0 ? void 0 : config.translationTableId);
    const newParams = (0, react_1.useMemo)(() => {
        return Object.assign(Object.assign({}, config), { productInfos: productInfos, isChina: isChina, locale: (0, mapping_1.mappingLanguage)(lng) || 'FR', compression: {
                imageResolution: isMobile ? '512' : '1024',
            } });
    }, [config, productInfos, isChina, lng]);
    const baseUrlClient = (config === null || config === void 0 ? void 0 : config.baseUrlClient) || '';
    const clientURLParams = (0, react_1.useMemo)(() => {
        const clientParams = Object.assign({}, params);
        clientParams === null || clientParams === void 0 ? true : delete clientParams.storeCode;
        clientParams === null || clientParams === void 0 ? true : delete clientParams.country;
        clientParams === null || clientParams === void 0 ? true : delete clientParams.timestamp;
        clientParams === null || clientParams === void 0 ? true : delete clientParams.token;
        return clientParams;
    }, [params]);
    const isLoading = isLoadingConfig || isLoadingProductId;
    const error = `${errorConfig ? errorConfig + ' ' : ''}${errorProductId ? errorProductId + ' ' : ''}${errorTranslation ? errorTranslation : ''}`.trim();
    return {
        newParams,
        baseUrlClient,
        clientURLParams,
        isChina,
        isLoading,
        error,
    };
};
exports.useParams = useParams;
exports.default = exports.useParams;
