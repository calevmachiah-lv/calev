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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSkusAvailability = exports.fetchLeadTime = exports.checkTextPurity = exports.getSavedConfig = exports.getCatalogProductBySku = exports.fetchPrice = exports.fetchStockQuantity = exports.fetchConfigVariables = void 0;
const PopUpType_1 = require("../../components/PopUp/PopUpType");
const ShowPopUp_1 = require("../../components/PopUp/ShowPopUp");
const request_1 = require("../../services/request");
const navigationParams_1 = require("../function/navigationParams");
function timeoutPromise(milliseconds) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, milliseconds);
    });
}
const { appName, token, timestamp } = (0, navigationParams_1.getParams)() || {};
const tokenjwt = localStorage.getItem('tokenjwt');
const location = window.location.host.includes('localhost');
const baseURL = location
    ? 'http://localhost:5000'
    : `https://${window.location.host}`;
const fetchConfigVariables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getConfigVariables',
        });
        return data || {};
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error:', errorMessage);
        return Promise.reject(errorMessage);
    }
});
exports.fetchConfigVariables = fetchConfigVariables;
const fetchStockQuantity = ({ storeCode, sku, isMobile, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getStockQuantity',
            params: {
                storeCode: String(storeCode),
                sku: String(sku),
            },
            timeout: 20000,
        });
        return data || { totalQuantity: 0 };
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error:', errorMessage);
        (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.quantityError });
        return Promise.reject(errorMessage);
    }
});
exports.fetchStockQuantity = fetchStockQuantity;
const fetchPrice = ({ lng, skus, country, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getPrices',
            params: {
                skus,
                lng,
                country,
            },
        });
        return data || {};
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error:', errorMessage);
        (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.priceError });
        return Promise.reject(errorMessage);
    }
});
exports.fetchPrice = fetchPrice;
const getCatalogProductBySku = ({ sku }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getCatalogProductBySku',
            params: {
                sku: String(sku),
            },
        });
        return data || {};
    }
    catch (error) {
        console.error('Error:', error.message);
        return Promise.reject(error.message);
    }
});
exports.getCatalogProductBySku = getCatalogProductBySku;
const getSavedConfig = ({ recipeId, isMobile, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getCustomConfiguration',
            params: {
                recipeId: String(recipeId),
            },
        });
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid JSON data in response');
        }
        return data || {};
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error:', errorMessage);
        (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.getConfigurationError });
        return Promise.reject(errorMessage);
    }
});
exports.getSavedConfig = getSavedConfig;
const checkTextPurity = ({ text, lng, isMobile, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'checkText',
            params: {
                text: String(text),
                lang: String(lng),
            },
        });
        if ((data === null || data === void 0 ? void 0 : data.found) === '1') {
            return { valid: false };
        }
        else {
            return { valid: true };
        }
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error:', errorMessage);
        (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.webPurifyError });
        return Promise.reject(errorMessage);
    }
});
exports.checkTextPurity = checkTextPurity;
const fetchLeadTime = ({ storeCode, sku, country, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = new URLSearchParams({
            storeCode: String(storeCode),
            sku: String(sku),
            country: String(country),
            appName: String(appName),
            token: String(token),
            tokenjwt: String(tokenjwt),
            timestamp: String(timestamp),
        }).toString();
        const fetchPromise = fetch(`${baseURL}/api/getSkuAvailability?${queryParams}`);
        const response = yield Promise.race([fetchPromise, timeoutPromise(20000)]);
        if (!response.ok) {
            const errorResponse = yield response.json();
            throw new Error(errorResponse.error || `HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return (data.distribution_leadtime || {
            distribution_leadtime: { min: 0, max: 0 },
        });
    }
    catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = 'An unknown error occurred';
        }
        console.error('Error:', errorMessage);
        (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.leadTimeError });
        return Promise.reject(errorMessage);
    }
});
exports.fetchLeadTime = fetchLeadTime;
const fetchSkusAvailability = ({ items, storeCode, appName = '', }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.apiRequest)({
            method: 'GET',
            path: 'getSkusAvailability',
            params: {
                items: JSON.stringify(items),
                storeCode,
                appName,
            },
        });
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
});
exports.fetchSkusAvailability = fetchSkusAvailability;
