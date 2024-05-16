"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningText = exports.WrapperTextInput = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../../../utils/constants");
exports.WrapperTextInput = styled_components_1.default.input.withConfig({
    shouldForwardProp: (prop) => !['insideOptionalGroup'].includes(prop),
})(({ theme: { device: { isDesktop }, appName, }, insideOptionalGroup, }) => `
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    font-family: LouisVuitton_Medium;
    font-size: 16px;
    border: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;

    &:focus {
      outline: none;
      border: 1px solid #000;
    }

    &::placeholder {
      font-size: 13px;
      font-family: LouisVuitton_Regular;
      text-transform: none;
      transform: translateY(-2px);
    }

    ${insideOptionalGroup && isDesktop ? `` : ``}

    ${appName === constants_1.OOB_APPNAME
    ? `
      border-radius: 90px;
      padding: 0 30px;
      height: 50px;
      border: 1px solid ##E0D7D5;
    `
    : ``}
`);
exports.WarningText = styled_components_1.default.div `
  letter-spacing: 0.3px;
  font-size: 10px;
  font-weight: 300;
  color: rgb(197, 57, 41);
`;
