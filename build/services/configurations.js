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
exports.getProductIdBySku = exports.getDatatable = exports.getConfigurations = exports.getSavedConfigurationByProductId = exports.getSavedConfiguration = exports.fetchThreekitDatatableTranslations = exports.getAttributeGrouping = exports.fetchAll = exports.fetchThreekit = exports.save = void 0;
const request_1 = require("./request");
const constants_1 = require("../utils/constants");
const navigationParams_1 = require("../utils/function/navigationParams");
const axios_1 = __importDefault(require("axios"));
const location = window.location.host.includes('localhost');
const baseURL = location
    ? 'http://localhost:5000'
    : `https://${window.location.host}`;
const save = ({ assetId, customerId, configuration, metadata, productVersion, thumbnailPath, attachments }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!assetId || !configuration) {
        return [undefined, { message: 'Requires Asset Id and Configuration' }];
    }
    const requestData = {
        productId: assetId,
        variant: configuration,
        productVersion,
    };
    if (metadata && Object.keys(metadata).length > 0) {
        requestData.metadata = metadata;
    }
    if (customerId) {
        requestData.customerId = customerId;
    }
    if (thumbnailPath) {
        requestData.thumbnailPath = thumbnailPath;
    }
    if (attachments && Object.keys(attachments).length > 0) {
        const attachmentsPrepped = {};
        for (const [key, file] of Object.entries(attachments)) {
            attachmentsPrepped[key] = file.name;
        }
        requestData.attachments = attachmentsPrepped;
    }
    try {
        const { appName, token, timestamp } = (0, navigationParams_1.getParams)();
        const tokenjwt = localStorage.getItem('tokenjwt') || '';
        const response = yield axios_1.default.post(`${baseURL}/api/postConfiguration`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { appName, token, timestamp, tokenjwt },
        });
        if (response.status !== 200) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const data = response === null || response === void 0 ? void 0 : response.data;
        return [data, null];
    }
    catch (error) {
        console.error('Error:', error);
        return [undefined, { message: 'Internal Server Error' }];
    }
});
exports.save = save;
const fetchThreekit = (recipeId) => {
    let message;
    if (!recipeId)
        message = 'Requires recipeId';
    if (message)
        return [undefined, { message }];
    return (0, exports.getSavedConfiguration)(recipeId);
};
exports.fetchThreekit = fetchThreekit;
const fetchAll = () => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, error] = yield (0, exports.getConfigurations)();
    if (error)
        return resolve([undefined, error]);
    resolve([data.configurations, undefined]);
}));
exports.fetchAll = fetchAll;
const getAttributeGrouping = ({ id, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const firstColumnName = 'Attribute Group';
        const response = yield (0, exports.getDatatable)({
            id
        });
        if (!response) {
            return null;
        }
        const data = (_a = response === null || response === void 0 ? void 0 : response.rows) === null || _a === void 0 ? void 0 : _a.reduce((acc, element) => {
            const _a = element === null || element === void 0 ? void 0 : element.value, _b = firstColumnName, groupName = _a[_b], restOfObject = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            if (!groupName) {
                return acc;
            }
            return Object.assign(Object.assign({}, acc), { [groupName]: Object.values(restOfObject).filter((el) => el.length > 0) });
        }, {});
        return data;
    }
    catch (error) {
        return null;
    }
});
exports.getAttributeGrouping = getAttributeGrouping;
const fetchThreekitDatatableTranslations = ({ format = 'json', id, lng = 'Master' }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const firstColumnName = 'Canonical Name';
        const translations = yield (0, exports.getDatatable)({ id });
        if (!translations) {
            return null;
        }
        const translationMap = (_b = translations === null || translations === void 0 ? void 0 : translations.rows) === null || _b === void 0 ? void 0 : _b.reduce((acc, element, rowIdx) => {
            if (!rowIdx) {
                return acc;
            }
            const _a = element === null || element === void 0 ? void 0 : element.value, _b = firstColumnName, groupName = _a[_b], restOfObject = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            const translationValue = restOfObject[lng];
            if (!groupName || !translationValue) {
                return acc;
            }
            return Object.assign(Object.assign({}, acc), { [groupName]: translationValue });
        }, {});
        return translationMap;
    }
    catch (error) {
        console.error('Error:', error);
        return null;
    }
});
exports.fetchThreekitDatatableTranslations = fetchThreekitDatatableTranslations;
const getSavedConfiguration = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    let error;
    if (!recipeId)
        error = 'Requires Configuration ID';
    if (error)
        return [undefined, { message: error }];
    try {
        const { appName, token, timestamp } = (0, navigationParams_1.getParams)();
        const response = yield axios_1.default.get(`/api/getCustomConfiguration`, {
            params: { recipeId, appName, token, timestamp },
        });
        if (response.status !== 200) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const data = response.data;
        return [data, null];
    }
    catch (error) {
        console.error('Error fetching saved configuration:', error);
        return [undefined, { message: 'Internal Server Error' }];
    }
});
exports.getSavedConfiguration = getSavedConfiguration;
const getSavedConfigurationByProductId = (productId) => {
    let error;
    if (!productId)
        error = 'Requires Product ID';
    if (error)
        return [undefined, { message: error }];
    return (0, request_1.threekitRequest)({
        url: `${constants_1.CONFIGURATIONS_API_ROUTE}/`,
        params: {
            productId,
        },
    });
};
exports.getSavedConfigurationByProductId = getSavedConfigurationByProductId;
const getConfigurations = () => {
    return (0, request_1.threekitRequest)({
        method: 'GET',
        url: `${constants_1.CONFIGURATIONS_API_ROUTE}`,
        includeOrgId: true,
    });
};
exports.getConfigurations = getConfigurations;
const getDatatable = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const { appName, token, timestamp } = (0, navigationParams_1.getParams)();
    const tokenjwt = localStorage.getItem('tokenjwt') || '';
    try {
        const response = yield axios_1.default.get(`${baseURL}/api/getDatatable`, {
            params: { id, appName, token, timestamp, tokenjwt },
        });
        if (response.status !== 200) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const data = response === null || response === void 0 ? void 0 : response.data;
        return JSON.parse(JSON.stringify(data));
    }
    catch (error) {
        console.error('Error fetching datatable:', error);
        return null;
    }
});
exports.getDatatable = getDatatable;
const getProductIdBySku = (sku) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appName, token, timestamp } = (0, navigationParams_1.getParams)();
        const response = yield axios_1.default.get(`${baseURL}/api/getProductIdBySku`, {
            params: { sku, appName, token, timestamp },
        });
        if (response.status !== 200) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const data = response.data;
        return data === null || data === void 0 ? void 0 : data.configuratorId;
    }
    catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
});
exports.getProductIdBySku = getProductIdBySku;
