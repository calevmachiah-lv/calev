"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconTitle = exports.Icon = exports.ClickableArea = exports.IconsWrapper = exports.OptionalGroupWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.OptionalGroupWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
exports.IconsWrapper = styled_components_1.default.div `
  display: flex;
  gap: 55px;
  margin-left: 23px;
`;
exports.ClickableArea = styled_components_1.default.div `
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
exports.Icon = styled_components_1.default.img `
  width: 35px;
`;
exports.IconTitle = styled_components_1.default.span `
  font-size: 13px;
  font-weight: 500;
`;
