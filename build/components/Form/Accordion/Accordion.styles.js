"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishButtonContainer = exports.AccordionContainer = void 0;
const styled_components_1 = require("styled-components");
const constants_1 = require("../../../utils/constants");
exports.AccordionContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
    height: 100%;
    overflow-y: scroll;
  
  ${isMobile
        ? `
      `
        : isIpad
            ? `
      `
            : isDesktop && appName !== constants_1.OOB_APPNAME
                ? `width: 100%;
      
     `
                : isDesktop && appName === constants_1.OOB_APPNAME
                    ? `max-width: 600px;`
                    : ''}   
`;
});
exports.FinishButtonContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
  background-color: #ffffff;
  padding: 20px;  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  ${isMobile ? '' : isIpad ? `` : isDesktop && appName !== constants_1.OOB_APPNAME ? `` : ''}
`);
