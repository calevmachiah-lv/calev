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
exports.waitForDataDrivenExtensionConfigurator = exports.waitForDataDrivenConfigurator = void 0;
const waitForDataDrivenConfigurator = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    while (!window.dataDrivenConfigurator ||
        !((_a = window.dataDrivenConfigurator) === null || _a === void 0 ? void 0 : _a.isInited) ||
        !(window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) ||
        !((_b = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _b === void 0 ? void 0 : _b.getStatus)) {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        yield wait(10);
    }
});
exports.waitForDataDrivenConfigurator = waitForDataDrivenConfigurator;
const waitForDataDrivenExtensionConfigurator = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    while (!window.dataDrivenConfiguratorExtension ||
        !((_c = window.dataDrivenConfiguratorExtension) === null || _c === void 0 ? void 0 : _c.isInited)) {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        yield wait(10);
    }
});
exports.waitForDataDrivenExtensionConfigurator = waitForDataDrivenExtensionConfigurator;
