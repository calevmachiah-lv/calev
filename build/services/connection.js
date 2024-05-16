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
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../utils/constants");
const connectionObj = joi_1.default.object({
    authToken: joi_1.default.string()
        .guid({
        version: ['uuidv4'],
    })
        .required(),
    orgId: joi_1.default.string().required(),
    assetId: joi_1.default.string(),
    threekitEnv: joi_1.default.string(),
    authProductToken: joi_1.default.string(),
    threekitProductEnv: joi_1.default.string(),
    serverUrl: joi_1.default.string().allow(''),
    useProxy: joi_1.default.boolean(),
});
const checkRuntime = new Function('try { return this === window; } catch(e) { return false; }');
class ThreekitConnection {
    constructor() {
        this._authToken = '';
        this._orgId = '';
        this._assetId = '';
        this._threekitEnv = '';
        this._isServerEnv = !checkRuntime();
        this._serverUrl = constants_1.DEFAULT_SERVER_URL;
        this._useProxy = false;
    }
    connect(config) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const preppedConfig = Object.assign(Object.assign({}, config), { authToken: this._authToken || config.authToken, orgId: this._orgId || config.orgId });
            const { value, error } = connectionObj.validate(preppedConfig);
            if (error)
                throw new Error(error.details[0].message);
            this._authToken = value.authToken;
            this._orgId = value.orgId;
            this._assetId = value.assetId;
            if (value.threekitEnv)
                this._threekitEnv = `${value.threekitEnv}`;
            if ((_a = value.serverUrl) === null || _a === void 0 ? void 0 : _a.length)
                this._serverUrl = value.serverUrl;
            if (preppedConfig.useProxy)
                this._useProxy = true;
        });
    }
    getConnection() {
        if (!this._authToken)
            throw new Error('Connection has not been established');
        return {
            authToken: this._authToken,
            orgId: this._orgId,
            assetId: this._assetId,
            threekitEnv: this._threekitEnv,
            isServerEnv: this._isServerEnv,
            serverUrl: this._serverUrl,
            useProxy: this._useProxy,
        };
    }
}
const connection = new ThreekitConnection();
exports.default = connection;
