"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeParamsObj = exports.paramsObjectToNavigationString = exports.safeParseJson = exports.getParams = void 0;
const objectToQueryString_1 = require("./objectToQueryString");
function getParams(inputUrl) {
    var _a;
    const url = new URL(inputUrl || window.location.href);
    let params = {};
    let strParams = '';
    if (!url.search.includes('?')) {
        const splittedPathname = (_a = url === null || url === void 0 ? void 0 : url.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
        const length = splittedPathname.length;
        strParams = splittedPathname[length - 1];
        if (strParams) {
            params = decodeParamsObj(strParams);
        }
    }
    else {
        params = Object.fromEntries(Array.from(url.searchParams.entries()).map(([key, value]) => [
            key,
            safeParseJson(value) || value,
        ]));
    }
    return params;
}
exports.getParams = getParams;
function safeParseJson(input) {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return null;
    }
}
exports.safeParseJson = safeParseJson;
const paramsObjectToNavigationString = (params, isChina = false) => {
    const newParams = getParams();
    return isChina
        ? decodeURIComponent((0, exports.encodeParamsObj)(params))
        : (0, objectToQueryString_1.objectToQueryStr)(params, newParams);
};
exports.paramsObjectToNavigationString = paramsObjectToNavigationString;
const encodeParamsObj = (params) => {
    return encodeURIComponent(bytesToBase64(new TextEncoder().encode(JSON.stringify(params))));
};
exports.encodeParamsObj = encodeParamsObj;
const bytesToBase64 = (bytes) => {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
    return btoa(binString);
};
const base64ToBytes = (base64) => {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
};
const decodeParamsObj = (params) => {
    return JSON.parse(new TextDecoder().decode(base64ToBytes(decodeURIComponent(params))));
};
