"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigationParams_1 = require("../../utils/function/navigationParams");
const mapping_1 = require("../../utils/function/mapping");
const react_query_1 = require("@tanstack/react-query");
const configurations_1 = require("../../services/configurations");
const react_i18next_1 = require("react-i18next");
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
const useTranslationInitialisation = (translationTableId) => {
    const params = (0, navigationParams_1.getParams)();
    const _a = params || {}, { lng: language } = _a, paramsRest = __rest(_a, ["lng"]);
    const lng = (0, mapping_1.mappingLanguage)(language || 'en_E1');
    const options = {
        debug: true,
        lng,
        paramsRest,
    };
    const { data: translations, isLoading: isLoadingTranslation, error: errorTranslation, } = (0, react_query_1.useQuery)({
        queryKey: ['product/fetchTranslations', translationTableId],
        queryFn: () => {
            const payload = (0, configurations_1.fetchThreekitDatatableTranslations)({
                id: translationTableId,
                lng,
            });
            if (!payload) {
                console.error('error fetching translations');
            }
            return payload;
        },
        staleTime: 300000,
        refetchOnWindowFocus: false,
        enabled: !!translationTableId && !!paramsRest,
        retry: false,
    });
    options.resources = {
        [lng]: {
            translation: translations,
        },
    };
    if (translations && !i18next_1.default.isInitialized) {
        i18next_1.default.use(i18next_http_backend_1.default).use(react_i18next_1.initReactI18next).init(options);
    }
    return { translations, isLoadingTranslation, errorTranslation };
};
exports.default = useTranslationInitialisation;
