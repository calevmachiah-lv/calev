"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipText = exports.TooltipTitle = exports.TooltipImage = exports.TooltipHeader = exports.TooltipContent = exports.TooltipArrow = exports.TooltipWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.TooltipWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['show'].includes(prop),
})(({ show }) => {
    return `
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
  opacity: ${show ? '1' : '0'};
  visibility: ${show ? '' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, height 0.3s ease-in-out;
  width: 390px;
  overflow-y: auto;
  min-height: 121px;
  text-align: left;
`;
});
exports.TooltipArrow = styled_components_1.default.div `
  position: fixed;
  width: 0;
  height: 0;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
`;
exports.TooltipContent = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 15px;
`;
exports.TooltipHeader = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;
exports.TooltipImage = styled_components_1.default.img `
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
exports.TooltipTitle = styled_components_1.default.div `
  font-size: 20px;
  font-weight: 500;
  font-feature-settings: 'case' on;
  line-height: 22px;
`;
exports.TooltipText = styled_components_1.default.div `
  font-size: 14px;
  line-height: 22px;
  font-feature-settings: 'case' on;
`;
