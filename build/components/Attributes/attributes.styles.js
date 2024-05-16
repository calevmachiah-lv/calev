"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesFlex = exports.AttributesContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.AttributesContainer = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  @media (orientation: landscape) {
    width: 40%;
    height: fit-content;
  }
`;
exports.AttributesFlex = styled_components_1.default.div `
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
  @media (orientation: landscape) {
    height: 100%;
    gap: 40px;
  }
`;
