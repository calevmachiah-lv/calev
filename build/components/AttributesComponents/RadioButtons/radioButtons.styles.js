"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionText = exports.DescriptionIcon = exports.DescriptionIconWrapper = exports.RadioButtonLabel = exports.RadioButton = exports.ClickableArea = exports.RadioButtonHeader = exports.RadioButtonWrapper = exports.RadioButtonsWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.RadioButtonsWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
exports.RadioButtonWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, showDescription, }) => {
    return `
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 100px; 
    transition: border-radius 0.1s ease-in-out;  
    ${isMobile && showDescription
        ? 'border-radius: 20px;'
        : isIpad && showDescription
            ? 'border-radius: 20px;'
            : isDesktop && showDescription
                ? 'border-radius: 20px;'
                : ''}  `;
});
exports.RadioButtonHeader = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
exports.ClickableArea = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, showDescription, }) => {
    return `
    cursor: pointer;
    display: flex; 
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;   
    ${showDescription && !isMobile
        ? 'padding: 18px 20px 10px 20px;'
        : 'padding: 18px 20px 18px 20px;'}   
    transition: padding 0.3s ease-in-out;
    `;
});
exports.RadioButton = styled_components_1.default.img `
  width: 15px;
`;
exports.RadioButtonLabel = styled_components_1.default.label(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
            font-size: 13px;
            font-family: LouisVuitton_Medium;
            text-transform: uppercase;
            ${isMobile
        ? ``
        : isIpad
            ? `
            font-size: 15px;
            `
            : isDesktop
                ? ``
                : ``}  
          `;
});
exports.DescriptionIconWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, showDescription, }) => {
    return `  display: flex;  align-items: center;  justify-content: center;  ${showDescription && !isMobile
        ? 'padding: 18px 20px 10px 20px;'
        : 'padding: 18px 20px 18px 20px;'} `;
});
exports.DescriptionIcon = styled_components_1.default.img `
  margin-left: auto;
  width: 15px;
  cursor: pointer;
`;
exports.DescriptionText = styled_components_1.default.p `
  margin: 0;
  overflow: hidden;
  font-size: 17px;
  line-height: 22px;
  font-family: LouisVuitton_Regular;
  font-feature-settings: 'case' on;
  overflow-y: auto;
  font-weight: 400;
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    margin 0.3s ease-in-out;
`;
