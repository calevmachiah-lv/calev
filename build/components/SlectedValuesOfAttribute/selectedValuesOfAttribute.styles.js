"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedValue = exports.SelectedValuesContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.SelectedValuesContainer = styled_components_1.default.div `
  display: flex;
  flex-wrap: wrap;
  white-space: pre;
`;
exports.SelectedValue = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['inStock'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, inStock, }) => {
    return `
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 2rem;
  color: ${inStock ? '#767676' : '#C53929'};
  text-wrap: nowrap;
  ${!inStock
        ? `&::before {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #C53929;
        margin-right: 0.2rem;
  }`
        : ''}
`;
});
