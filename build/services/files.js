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
exports.postFile = exports.save = void 0;
const form_data_1 = __importDefault(require("form-data"));
const request_1 = require("./request");
const constants_1 = require("../utils/constants");
const save = (data) => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
    let message;
    if (!data)
        message = 'Requires Data';
    if (message)
        return resolve([undefined, { message }]);
    const fd = new form_data_1.default();
    fd.append(data.fieldname, data.buffer, data.originalname);
    const [fileResponse, error] = yield (0, exports.postFile)(fd);
    if (error)
        resolve([undefined, error]);
    resolve([fileResponse, undefined]);
}));
exports.save = save;
const postFile = (formData) => {
    let error;
    if (!formData)
        error = 'Requires Form Data';
    if (error)
        return [undefined, { message: error }];
    return (0, request_1.threekitRequest)({
        method: 'POST',
        url: constants_1.FILES_API_ROUTE,
        formData,
    });
};
exports.postFile = postFile;
