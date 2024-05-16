"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const i18next_1 = require("i18next");
const AttributesComponents_1 = __importStar(require("../../../AttributesComponents"));
const attributes_styled_1 = require("./attributes.styled");
const threekitHooks_1 = require("../../../../utils/threekitHooks");
const constants_1 = require("../../../../utils/constants");
const selectors_1 = require("../../../../store/globalSettingsSlicer/selectors");
const react_redux_1 = require("react-redux");
const mockAttributeNameToComponent = {
    HDS_Exterior: AttributesComponents_1.BigAssetsAttr,
    HDS_Exterior_Material: AttributesComponents_1.VerticalAssetsAttr,
    HDS_Interior1: AttributesComponents_1.SmallAssetsAttr,
    HDS_Interior2: AttributesComponents_1.SmallAssetsAttr,
    HDS_Interior3: AttributesComponents_1.SmallAssetsAttr,
    HDS_Custom_Text_Line_1: AttributesComponents_1.TextInput,
    HDS_Custom_Text_Line_2: AttributesComponents_1.TextInput,
    HDS_Custom_Text_Color: AttributesComponents_1.BigAssetsAttr,
    HDS_Has_Custom_Text: AttributesComponents_1.OptionalGroup,
    HDS_Lock_Number: AttributesComponents_1.TextInputNumbers,
    HDS_Has_Lock_Number: AttributesComponents_1.RadioButtons,
    'MODEL Taille': AttributesComponents_1.RadioButtons,
    'Exterior material': AttributesComponents_1.BigAssetsAttr,
    'Exterior Material': AttributesComponents_1.RadioButtons,
    'Exterior Material Color': AttributesComponents_1.DynamicSizeAssetsAttr,
    'Lining Material': AttributesComponents_1.BigAssetsAttr,
    'Lining Color': AttributesComponents_1.SmallAssetsAttr,
    'has lock number': AttributesComponents_1.RadioButtons,
    'perso + / Lock number exists': AttributesComponents_1.TextInputNumbers,
    'has patch': AttributesComponents_1.RadioButtons,
    'perso + / patch style': AttributesComponents_1.PatchStyleAttr,
    'perso + / patch text line 1': AttributesComponents_1.TextInput,
    'perso + / patch text line 2': AttributesComponents_1.TextInput,
    'Metallic finition - WOMEN': AttributesComponents_1.VerticalAssetsAttr,
    species: AttributesComponents_1.RadioButtons,
    Theme: AttributesComponents_1.RadioButtons,
    'MODEL taille': AttributesComponents_1.RadioButtons,
    'Choix du Lining': AttributesComponents_1.BigAssetsAttr,
    'Patch text color - WOMEN': AttributesComponents_1.PatchStyleAttr,
    'sens ouverture': AttributesComponents_1.InitialBigAssetsAttr
};
function Attribute({ attribute, attributesInGroup, insideOptionalGroup, }) {
    var _a;
    const { appName } = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams) || {};
    const { isDesktop } = (0, threekitHooks_1.useWindowSize)();
    const { isAttributeValid, validAttributes: validValues } = (0, threekitHooks_1.useValidAttributes)(attribute === null || attribute === void 0 ? void 0 : attribute.name);
    const AttributeComponent = (0, react_1.useMemo)(() => {
        var _a, _b;
        return ((_a = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _a === void 0 ? void 0 : _a.frontComponent)
            ? AttributesComponents_1.default[(_b = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _b === void 0 ? void 0 : _b.frontComponent]
            : mockAttributeNameToComponent[attribute.name]
                ? mockAttributeNameToComponent[attribute.name]
                : AttributesComponents_1.SmallAssetsAttr;
    }, [attribute.name, (_a = attribute === null || attribute === void 0 ? void 0 : attribute.metadata) === null || _a === void 0 ? void 0 : _a.frontComponent]);
    return AttributeComponent ? ((0, jsx_runtime_1.jsxs)(attributes_styled_1.AttributeWrapper, { attributesInGroup: attributesInGroup, show: isAttributeValid && (validValues === null || validValues === void 0 ? void 0 : validValues.length) !== 1, insideOptionalGroup: insideOptionalGroup, children: [attributesInGroup &&
                attributesInGroup > 1 &&
                !(appName === constants_1.OOB_APPNAME && isDesktop && insideOptionalGroup) && ((0, jsx_runtime_1.jsx)(attributes_styled_1.AttributeLabel, { insideOptionalGroup: true, children: (0, i18next_1.t)(attribute.name, attribute.name) })), (0, jsx_runtime_1.jsx)(AttributeComponent, { attribute: attribute, insideOptionalGroup: insideOptionalGroup, validValues: validValues })] })) : ((0, jsx_runtime_1.jsx)("div", { children: attribute.name }));
}
exports.default = Attribute;
