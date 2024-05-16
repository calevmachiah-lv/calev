"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeLabel = exports.AttributeWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.AttributeWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['attributesInGroup', 'insideOptionalGroup', 'show'].includes(prop),
})(({ theme: { device: { isDesktop }, }, attributesInGroup, show, insideOptionalGroup, }) => `
  ${attributesInGroup && attributesInGroup > 1 && !insideOptionalGroup
    ? `padding: ${isDesktop ? '40px' : '18px 20px'}; 
         border: 1px solid #E6E6E6; 
         border-radius: 20px;
         &:not(:last-child) {
          margin-bottom: 15px;
        }
         `
    : ``}
  ${!show
    ? `max-height: 0;
      padding: 0;
      border: none;
      overflow: hidden;
      margin-bottom: 0 !important;`
    : ''}
  transition: max-height 0.3s ease-in-out,
              padding 0.3s ease-in-out,
              border 0.3s ease-in-out;
  `);
exports.AttributeLabel = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['insideOptionalGroup'].includes(prop),
}) `
  color: #000000;
  font-size: 13px;
  font-weight: 500;
  padding-bottom: 15px;
  ${(props) => props.insideOptionalGroup
    ? `color: rgba(0, 0, 0, 0.40); font-size: 11px; font-family: LouisVuitton_Demi; font-weight: 600; text-transform: uppercase;`
    : ''}
`;
