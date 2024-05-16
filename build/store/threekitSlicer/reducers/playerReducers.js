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
exports.launch = void 0;
const __1 = require("..");
const configurationReducers_1 = require("./configurationReducers");
const controller_1 = __importDefault(require("../../../controller"));
const constants_1 = require("../../../utils/constants");
const launch = (config) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    const launchConfig = Object.assign({}, constants_1.DEFAULT_PLAYER_CONFIG, Object.keys(constants_1.DEFAULT_PLAYER_CONFIG).reduce((output, key) => {
        if (config[key] === undefined)
            return output;
        return Object.assign(output, { [key]: config[key] });
    }, {}), {
        orgId: config.orgId,
        threekitEnv: config.threekitEnv,
        serverUrl: config.serverUrl,
        language: config.language,
        additionalTools: config.additionalTools,
        threekitProductEnv: config.threekitProductEnv,
        authProductToken: config.authProductToken,
        isChina: config.isChina,
        compression: config.compression,
        productInfos: config.productInfos,
    });
    yield controller_1.default.launch(launchConfig);
    dispatch((0, __1.setThreekitLoaded)(true));
    dispatch((0, __1.setProduct)(window.threekit.controller.getProduct()));
    dispatch((0, __1.setForm)(window.threekit.controller.getForm(config)));
    dispatch((0, __1.setMetadata)(window.threekit.configurator.getMetadata()));
    dispatch((0, configurationReducers_1.setConfiguration)(window.threekit.configurator.getConfiguration()));
    if (config.language) {
        return dispatch((0, __1.setLanguageState)(config.language));
    }
    dispatch((0, __1.setAttributes)(window.threekit.controller.getAttributes()));
});
exports.launch = launch;
