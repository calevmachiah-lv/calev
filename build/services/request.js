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
exports.apiRequest = exports.threekitRequest = exports.serverRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const connection_1 = __importDefault(require("./connection"));
const objectToQueryString_1 = require("../utils/function/objectToQueryString");
const navigationParams_1 = require("../utils/function/navigationParams");
const serverRequest = (request) => {
    if (!request)
        throw new Error('Request missing');
    const { url, method, data, params, config } = Object.assign({
        method: 'GET',
        params: {},
    }, request);
    const { serverUrl } = connection_1.default.getConnection();
    const urlRaw = `${serverUrl}${url}`;
    const query = (0, objectToQueryString_1.objectToQueryStr)(Object.assign({}, params));
    let urlPrepped = `${urlRaw}${query}`;
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        try {
            switch (method) {
                case 'GET':
                case 'get':
                    response = yield axios_1.default.get(urlPrepped, config);
                    break;
                case 'POST':
                case 'post':
                    response = yield axios_1.default.post(urlPrepped, data, config);
                    break;
                case 'put':
                case 'PUT':
                    response = yield axios_1.default.put(urlPrepped, data, config);
                    break;
                case 'delete':
                case 'DELETE':
                    response = yield axios_1.default.delete(urlPrepped, config);
                    break;
                default:
                    return resolve([
                        undefined,
                        { message: `Unknown request method: ${method}` },
                    ]);
            }
            resolve([response.data, undefined]);
        }
        catch (e) {
            resolve([undefined, e]);
        }
    }));
};
exports.serverRequest = serverRequest;
const threekitRequest = (request, env) => {
    if (!request)
        throw new Error('Request missing');
    const { url, method, data, formData, params, config, includeOrgId } = Object.assign({
        method: 'GET',
        params: {},
        includeOrgId: false,
    }, typeof request === 'string' ? { url: request } : request);
    const { authToken, orgId, threekitEnv, isServerEnv, useProxy } = connection_1.default.getConnection();
    const urlRaw = `${env || threekitEnv}${url}`;
    const queryProxy = {
        cacheScope: '123',
        cacheMaxAge: '600',
    };
    const query = (0, objectToQueryString_1.objectToQueryStr)(Object.assign({}, includeOrgId ? { orgId } : {}, params, useProxy && method.toLowerCase() === 'get' ? queryProxy : queryProxy));
    let urlPrepped = `${urlRaw}${query}`;
    let configPrepped = Object.assign({}, config);
    if (isServerEnv)
        configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
            authorization: `Bearer ${authToken}`,
        });
    else if (!params.bearer_token)
        urlPrepped += `${query.length ? `&` : `?`}bearer_token=${authToken}`;
    if (formData)
        configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
            'content-type': `multipart/form-data; boundary=${formData._boundary}`,
        });
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        try {
            switch (method) {
                case 'GET':
                case 'get':
                    response = yield axios_1.default.get(urlPrepped, configPrepped);
                    break;
                case 'POST':
                case 'post':
                    response = yield axios_1.default.post(urlPrepped, formData || data, configPrepped);
                    break;
                case 'put':
                case 'PUT':
                    response = yield axios_1.default.put(urlPrepped, formData || data, configPrepped);
                    break;
                case 'delete':
                case 'DELETE':
                    response = yield axios_1.default.delete(urlPrepped, configPrepped);
                    break;
                default:
                    return resolve([
                        undefined,
                        { message: `Unknown request method: ${method}` },
                    ]);
            }
            resolve([response.data, undefined]);
        }
        catch (e) {
            resolve([undefined, e]);
        }
    }));
};
exports.threekitRequest = threekitRequest;
const { appName, token, timestamp } = (0, navigationParams_1.getParams)() || {};
const tokenjwt = localStorage.getItem('tokenjwt');
const location = window.location.host.includes('localhost');
const baseURL = location
    ? 'http://localhost:5000'
    : `https://${window.location.host}`;
function timeoutPromise(milliseconds) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, milliseconds);
    });
}
const apiRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request)
        throw new Error('Request missing');
    const { path, method, params, config, timeout, ttlTime } = Object.assign({
        method: 'GET',
        params: {},
        timeout: 0,
        // ttlTime: 0,
    }, typeof request === 'string' ? { path: request } : request);
    // const delay = (ms: number) => ttlTime ? new Promise(resolve => setTimeout(resolve, ms)) : null;
    try {
        // await delay(ttlTime);
        const queryParams = (0, objectToQueryString_1.objectToQueryStr)(Object.assign({ appName,
            token,
            tokenjwt,
            timestamp }, params));
        const fetchUrl = `${baseURL}/api/${path}${queryParams}`;
        const fetchPromise = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield fetch(fetchUrl, Object.assign({ method }, config));
        });
        const response = timeout
            ? Promise.race([fetchPromise(), timeoutPromise(timeout)])
            : yield fetchPromise();
        console.error(response);
        if (!response.ok) {
            const errorResponse = yield response.json();
            throw new Error(errorResponse.error || `HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
});
exports.apiRequest = apiRequest;
