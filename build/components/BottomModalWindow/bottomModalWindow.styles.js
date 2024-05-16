"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomModalWindowText = exports.BottomModalWindowTitle = exports.BarLine = exports.BarLineWrapper = exports.BottomModalWindowWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.BottomModalWindowWrapper = styled_components_1.default.div `
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  z-index: 100;
  padding: 45px 20px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.2);
  transition: top 0.3s ease-in-out;
`;
exports.BarLineWrapper = styled_components_1.default.div `
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  min-height: 30px;
`;
exports.BarLine = styled_components_1.default.img `
  width: 10%;
  position: relative;
  left: 45%;
`;
exports.BottomModalWindowTitle = styled_components_1.default.h2 `
  margin: 0;
  font-size: 15px;
  font-family: LouisVuitton_Demi;
  line-height: 22px;
  font-feature-settings: 'case' on;
`;
exports.BottomModalWindowText = styled_components_1.default.p `
  margin: 0;
  font-size: 17px;
  font-family: LouisVuitton_Regular;
  line-height: 22px;
  font-weight: 400;
  font-feature-settings: 'case' on;
`;
