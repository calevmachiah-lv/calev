"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonSubLabel = exports.ButtonLabel = exports.ButtonTextWrapper = exports.ButtonWrapper = exports.ButtonsWrapper = exports.Text = exports.Title = exports.CloseButton = exports.DataWrapper = exports.MainWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.MainWrapper = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => `
  color: #19110b;
  overflow-y: auto;
  background-color: #fff;
  transition: transform 0.3s, height 0.3s;

`);
exports.DataWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['open'].includes(prop),
})(({ theme: { device: { isMobile }, }, open, }) => `
  color: #19110b;
  overflow-y: auto;
  background-color: #fff;
  transition: all 0.3s;
  height: 100%;
  position: fixed;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 100;
  ${open
    ? `
      top: 0;
  `
    : `
    top: 100vh;
  `}
`);
exports.CloseButton = styled_components_1.default.img(({ theme: { device: { isMobile }, }, }) => `
  position: absolute;
  cursor: pointer;
  top: 0;
  &.back {
  left: 0;
  width: 9px;
  }
  &.close {
  right: 0;
  width: 16px;
  }
`);
exports.Title = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['firstPage'].includes(prop),
})(({ theme: { device: { isMobile }, }, firstPage, }) => `
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-left: ${firstPage ? '0' : '20px'};
`);
exports.Text = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => `
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 40px;
`);
exports.ButtonsWrapper = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => `
  display: flex;
  flex-direction: column;
  gap: 20px;
`);
exports.ButtonWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
  display:flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  .thumbnail {
    width: 40px;
  }
  .arrow {
    height: 12px;
    margin-left: auto;
  }
`);
exports.ButtonTextWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
  display: flex;
  flex-direction: column;
  gap: 5px;
`);
exports.ButtonLabel = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
  font-size: 14px;
  line-height: 20px;
`);
exports.ButtonSubLabel = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
  color: #5E5A56;
  font-size: 14px;
  line-height: 20px;
`);
