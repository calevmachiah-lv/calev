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
exports.ValuesContainer = exports.BesideAttributesContainer = exports.SelectionSummaryIcon = exports.TitlePriceContainer = exports.BottomFormContainer = exports.TopFormContainer = exports.FormContainer = exports.BackgroundWrapper = void 0;
const styled_components_1 = __importStar(require("styled-components"));
exports.BackgroundWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['show'].includes(prop),
}) `
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ show }) => show ? 'rgba(0, 0, 0, 0.52)' : 'transparent'};
  z-index: ${({ show }) => (show ? 99 : -1)};
  transition: ${({ show }) => (show ? 'all 0.7s ease' : 'all 0.2s ease')};
`;
exports.FormContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  padding: 26px 0;
  height: 25vh;
  height: 25svh;
  border-radius: 24px 24px 0 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
`;
exports.TopFormContainer = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  max-height: 50%;
  padding: 0 25px;
`;
exports.BottomFormContainer = styled_components_1.default.div `
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;
exports.TitlePriceContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
exports.SelectionSummaryIcon = styled_components_1.default.img `
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
exports.BesideAttributesContainer = styled_components_1.default.div `
  display: flex;
  gap: 10px;
  min-width: 250px;
  width: 30%;
  max-width: 300px;
`;
exports.ValuesContainer = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => (0, styled_components_1.css) `
    position: absolute;
    max-width: 100%;
    height: 100%;
    padding: 0 25px;
    transition: all 0.5s ease-in-out;
    ${!isMobile &&
    (0, styled_components_1.css) `
      display: flex;
      overflow-x: auto;
      gap: 20px;
      height: -webkit-fill-available;
      align-items: center;
    `}
  `);
