"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwaitPlayerLoad = exports.AnimateItem = void 0;
const AnimateItem_1 = __importDefault(require("./AnimateItem"));
exports.AnimateItem = AnimateItem_1.default;
const AwaitPlayerLoad_1 = __importDefault(require("./AwaitPlayerLoad"));
exports.AwaitPlayerLoad = AwaitPlayerLoad_1.default;
exports.default = {
    AnimateItem: AnimateItem_1.default,
    AwaitPlayerLoad: AwaitPlayerLoad_1.default,
};
