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
exports.fetchProduct = exports.getProduct = void 0;
const navigationParams_1 = require("../utils/function/navigationParams");
const axios_1 = __importDefault(require("axios"));
const location = window.location.host.includes('localhost');
const baseURL = location
    ? 'http://localhost:5000'
    : `https://${window.location.host}`;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, exports.fetchProduct)(id);
        return response;
    }
    catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
});
exports.getProduct = getProduct;
const fetchProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { appName, token, timestamp } = (0, navigationParams_1.getParams)();
    try {
        const response = yield axios_1.default.get(`${baseURL}/api/getCatalogProduct`, {
            params: { id, appName, token, timestamp },
        });
        if (response.status !== 200) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const data = response === null || response === void 0 ? void 0 : response.data;
        return data;
    }
    catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
});
exports.fetchProduct = fetchProduct;
