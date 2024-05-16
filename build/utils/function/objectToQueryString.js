"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToQueryStr = void 0;
const mapping_1 = require("./mapping");
const objectToQueryStr = (obj, newParams) => {
    if (!obj || !Object.keys(obj).length)
        return '';
    return Object.entries(obj).reduce((output, [key, val], i) => {
        if (i)
            output += '&';
        if (val !== undefined) {
            if (key === 'token') {
                output += `${key}=${(newParams === null || newParams === void 0 ? void 0 : newParams.token) || val}`;
            }
            else if (key === 'lang') {
                output += `${key}=${(0, mapping_1.webPurifyLanguageMappings)(val)}`;
            }
            else {
                output += `${key}=${val}`;
            }
        }
        return output;
    }, '?');
};
exports.objectToQueryStr = objectToQueryStr;
