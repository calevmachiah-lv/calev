"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const attributes_styled_1 = require("./attributes.styled");
const AttributesComponents_1 = require("../../../AttributesComponents");
const constants_1 = require("../../../../utils/constants");
const selectors_1 = require("../../../../store/globalSettingsSlicer/selectors");
const threekitHooks_1 = require("../../../../utils/threekitHooks");
const Attribute_1 = __importDefault(require("../Attribute"));
function Attributes({ attributes, isActive, numOfAttrs, insideOptionalGroup = false, optionalGroupIcon = false, }) {
    const { appName } = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const { isDesktop } = (0, threekitHooks_1.useWindowSize)();
    const [optionalGroupAttribute, elseAttributes] = (0, react_1.useMemo)(() => {
        let optionalGroupAttribute;
        let elseAttributes = [];
        Object.values(attributes).forEach((attribute) => {
            if (attribute.frontComponent === 'OptionalGroup' ||
                [
                    'HDS_Has_Custom_Text',
                    'HDS_Has_Lock_Number',
                    'has patch',
                    'has lock number',
                ].includes(attribute.name)) {
                optionalGroupAttribute = attribute;
            }
            else {
                elseAttributes.push(attribute);
            }
        });
        return [optionalGroupAttribute, elseAttributes];
    }, [attributes]);
    return ((0, jsx_runtime_1.jsx)(attributes_styled_1.AttributesWrapper, { isActive: isActive, insideOptionalGroup: insideOptionalGroup, optionalGroupIcon: optionalGroupIcon, children: optionalGroupAttribute ? (appName === constants_1.OOB_APPNAME && isDesktop ? ((0, jsx_runtime_1.jsx)(AttributesComponents_1.OptionalGroupIcons, { attribute: optionalGroupAttribute, attributesInGroup: numOfAttrs, elseAttributes: elseAttributes }, optionalGroupAttribute.id)) : ((0, jsx_runtime_1.jsx)(AttributesComponents_1.OptionalGroup, { attribute: optionalGroupAttribute, attributesInGroup: numOfAttrs, elseAttributes: elseAttributes }, optionalGroupAttribute === null || optionalGroupAttribute === void 0 ? void 0 : optionalGroupAttribute.id))) : (Object.values(attributes).map((attribute) => ((0, jsx_runtime_1.jsx)(Attribute_1.default, { attribute: attribute, attributesInGroup: numOfAttrs, insideOptionalGroup: insideOptionalGroup }, attribute.id)))) }));
}
exports.default = Attributes;
