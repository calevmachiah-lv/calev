"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLeadtime = exports.getPriceWithCurrency = void 0;
const constants_1 = require("../../utils/constants");
const currency_json_1 = __importDefault(require("../currency.json"));
const i18next_1 = require("i18next");
const getPriceWithCurrency = (price, currency) => {
    if (!price || !currency) {
        return (0, i18next_1.t)('product.label.missing_price', { defaultValue: constants_1.PRICE_PLACEHOLDER });
    }
    //@ts-ignore
    const currencySymbol = currency_json_1.default[currency] || currency || '';
    return `${price}${currencySymbol}`;
};
exports.getPriceWithCurrency = getPriceWithCurrency;
const calculateLeadtime = ({ min, max, }) => {
    let unit, value, newMin, newMax;
    newMin = min;
    newMax = max;
    if (min <= 0 && max <= 0)
        return { unit: null, value: '' };
    if (min < 7) {
        unit = 'days';
    }
    else {
        unit = 'weeks';
        newMin = Math.floor(min / 7);
        newMax = Math.floor(max / 7);
    }
    if (newMin === newMax) {
        value = `${newMin}`;
    }
    else {
        value = `${newMin}/${newMax}`;
    }
    return { unit, value };
};
exports.calculateLeadtime = calculateLeadtime;
