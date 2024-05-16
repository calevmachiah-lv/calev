"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipContainer = exports.TooltipText = exports.TooltipIcon = exports.TooltipWrapper = exports.WrapperAtr = exports.IconStyle = exports.ChosenColor = exports.ValueTitle = exports.ColorNameWrapper = exports.HeadingTitle = exports.HeadingWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../../../../utils/constants");
exports.HeadingWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isActive'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, isActive, }) => {
    return `  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 65px;
  ${isMobile
        ? isActive === constants_1.NEXT_LABEL
            ? 'animation: slide-in-right 0.4s ease-in-out forwards;'
            : isActive === 'prev'
                ? 'animation: slide-in-left 0.4s ease-in-out forwards;'
                : 'display: none;'
        : isIpad
            ? `
        padding: 25px 20px;
        border-bottom: 1px solid #E0D7D5;
        `
            : isDesktop
                ? `padding: 25px 20px;
      cursor: pointer;
      ${appName !== constants_1.OOB_APPNAME ? 'border-bottom: 1px solid #E0D7D5;' : ''}
      `
                : ``}
`;
});
exports.HeadingTitle = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
  font-size: 15px;
  font-family: LouisVuitton_Demi;
  overflow: hidden;
  width: auto;
  text-overflow: ellipsis;
  padding-right: 20px;
  ${isMobile
        ? `
      `
        : isIpad
            ? `
      font-size: 17px;
      `
            : isDesktop && appName === constants_1.OOB_APPNAME
                ? `text-transform: none;`
                : ''}
  
 
  `;
});
exports.ColorNameWrapper = styled_components_1.default.div `
  display: flex;
  gap: 10px;
  align-items: center;
  height: 1em;
`;
exports.ValueTitle = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
      font-size: 11px;
      font-weight: 400;
      text-transform: capitalize;
  `;
});
exports.ChosenColor = styled_components_1.default.img(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
  width: 30px;
  height: 30px;
  border-radius: 5px;

  ${isMobile
        ? ''
        : isIpad
            ? `
      `
            : isDesktop && appName === constants_1.OOB_APPNAME
                ? `
      border-radius: 20px;
     `
                : ''}
  `;
});
exports.IconStyle = styled_components_1.default.img `
  width: 20px;
  height: 20px;
`;
exports.WrapperAtr = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
    display: flex;
    gap: 20px;
    align-items: center;

    ${isMobile ? `` : ``}
    ${isIpad ? `gap: 10px;` : ``}
    ${isDesktop && appName !== constants_1.OOB_APPNAME ? `gap: 10px;` : ``}
  `;
});
exports.TooltipWrapper = styled_components_1.default.div `
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
exports.TooltipIcon = styled_components_1.default.img `
  width: 20px; /* Set the width as per your icon's size */
  height: 20px; /* Set the height as per your icon's size */
`;
exports.TooltipText = styled_components_1.default.div `
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  display: none;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 160px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
exports.TooltipContainer = styled_components_1.default.div `
  height: 1em;
  &:hover ${exports.TooltipText}, &:active ${exports.TooltipText} {
    display: block;
    opacity: 0.9;
    z-index: 2000;
  }
`;
