"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicSizeAssetsAttr = exports.RadioButtons = exports.TextInputNumbers = exports.OptionalGroupIcons = exports.OptionalGroup = exports.TextInput = exports.VerticalAssetsAttr = exports.InitialBigAssetsAttr = exports.BigAssetsAttr = exports.PatchStyleAttr = exports.SmallAssetsAttr = exports.AssetsAttr = void 0;
const AssetsAttr_1 = __importDefault(require("./AssetsAttr"));
exports.AssetsAttr = AssetsAttr_1.default;
const TextInput_1 = __importDefault(require("./TextInput"));
exports.TextInput = TextInput_1.default;
const OptionalGroup_1 = __importDefault(require("./OptionalGroup"));
exports.OptionalGroup = OptionalGroup_1.default;
const OptionalGroupIcons_1 = __importDefault(require("./OptionalGroupIcons"));
exports.OptionalGroupIcons = OptionalGroupIcons_1.default;
const RadioButtons_1 = __importDefault(require("./RadioButtons"));
exports.RadioButtons = RadioButtons_1.default;
const constants_1 = require("../../utils/constants");
const TextInputNumbers = (props) => (0, TextInput_1.default)(Object.assign(Object.assign({}, props), { type: 'number' }));
exports.TextInputNumbers = TextInputNumbers;
const SmallAssetsAttr = (props) => (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.SMALL_SIZE_LABEL }));
exports.SmallAssetsAttr = SmallAssetsAttr;
const PatchStyleAttr = (props) => (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.PATCH_STYLE_LABEL }));
exports.PatchStyleAttr = PatchStyleAttr;
const BigAssetsAttr = (props) => (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.BIG_SIZE_LABEL, noImage: false }));
exports.BigAssetsAttr = BigAssetsAttr;
const InitialBigAssetsAttr = (props) => (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.BIG_SIZE_LABEL, noImage: true }));
exports.InitialBigAssetsAttr = InitialBigAssetsAttr;
const VerticalAssetsAttr = (props) => (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.VERTICAL_SIZE_LABEL }));
exports.VerticalAssetsAttr = VerticalAssetsAttr;
const DynamicSizeAssetsAttr = (props) => {
    if (props.validValues.length > 5) {
        return (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.SMALL_SIZE_LABEL }));
    }
    else {
        return (0, AssetsAttr_1.default)(Object.assign(Object.assign({}, props), { size: constants_1.BIG_SIZE_LABEL }));
    }
};
exports.DynamicSizeAssetsAttr = DynamicSizeAssetsAttr;
const toExport = {
    AssetsAttr: AssetsAttr_1.default,
    SmallAssetsAttr: SmallAssetsAttr,
    BigAssetsAttr: BigAssetsAttr,
    InitialBigAssetsAttr: InitialBigAssetsAttr,
    VerticalAssetsAttr: VerticalAssetsAttr,
    PatchStyleAttr: PatchStyleAttr,
    TextInput: TextInput_1.default,
    OptionalGroup: OptionalGroup_1.default,
    OptionalGroupIcons: OptionalGroupIcons_1.default,
    TextInputNumbers: TextInputNumbers,
    RadioButtons: RadioButtons_1.default,
    DynamicSizeAssetsAttr: DynamicSizeAssetsAttr,
};
exports.default = toExport;
