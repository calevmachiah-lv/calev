"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeI18n = void 0;
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
const services_1 = __importDefault(require("../services"));
const navigationParams_1 = require("utils/function/navigationParams");
const mapping_1 = require("utils/function/mapping");
const initializeI18n = (translationTableId) => __awaiter(void 0, void 0, void 0, function* () {
    const params = (0, navigationParams_1.getParams)();
    const lng = (0, mapping_1.mappingLanguage)(params['lng'] || 'en_E1');
    const options = {
        debug: true,
        lng,
        fallbackLng: 'en_E1',
        interpolation: {
            escapeValue: false,
        },
    };
    try {
        const translation = yield services_1.default.configurations.fetchThreekitDatatableTranslations({
            id: translationTableId,
            lng,
        });
        if (translation && Object.keys(translation).length > 0) {
            options.resources = {
                [lng]: {
                    translation: translation,
                },
            };
        }
        else {
            console.error('Error: Translation is empty or not available.');
        }
    }
    catch (error) {
        console.error('Error fetching translation:', error);
    }
    i18next_1.default.use(i18next_http_backend_1.default).use(react_i18next_1.initReactI18next).init(options);
    return options === null || options === void 0 ? void 0 : options.resources;
});
exports.initializeI18n = initializeI18n;
