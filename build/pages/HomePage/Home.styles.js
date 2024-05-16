"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboveFormContainer = exports.WrapperContainer = exports.ProductNameAndReset = exports.Reset = exports.ProductAndAboveContainer = exports.InnerContainer = exports.ProductPriceShimmer = exports.ProductPrice = exports.ProductName = exports.ProductInfosContainer = exports.Container = void 0;
const constants_1 = require("../../utils/constants");
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.styled.div.withConfig({
    shouldForwardProp: (prop) => !['divHeight', 'overscroll'].includes(prop),
})(({ theme: { device: { isMobile }, }, overscroll, }) => {
    return `
      display: flex;
      flex-direction: column;
      color: black;
      overflow: ${overscroll ? 'hidden' : 'scroll'};
      height: 100vh;
      ${!isMobile
        ? `
            flex-direction: column;
            & > * {
              flex: 1;              
            }
            `
        : ''} 
    `;
});
exports.ProductInfosContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: transparent;
        height: min-content;
        
        ${isMobile
        ? ``
        : `        
          position: fixed;
          top: 5vmin;
          left: 5vmin;
        `}
`;
});
exports.ProductName = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
        font-size: 18px;
        font-family: LouisVuitton_Regular;
        flex-wrap:wrap;
        word-wrap: break-word;
        ${isMobile
        ? ''
        : isIpad
            ? ''
            : isDesktop
                ? ''
                : ''}
        `;
});
exports.ProductPrice = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        z-index: 1000;
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        font-family: LouisVuitton_Medium;
        color: #A6A6A6;
        ${isMobile
        ? ''
        : isIpad
            ? 'font-size: 15px; color: #000;'
            : isDesktop
                ? 'font-size: 15px; color: #000;'
                : ''}

    `;
});
exports.ProductPriceShimmer = styled_components_1.styled.div(() => {
    return `
  z-index: 1000;
  height: 20px;
  width: 60px;
  //padding: 8px 30px;
  border-radius: 100px;

  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  animation: shimmer 20s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: -80vw 0;
    }
    100% {
      background-position: 80vw 0;
    }
  }
`;
});
exports.InnerContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
    ${(isIpad || isDesktop) &&
    `
        display: flex;
        flex-direction: column;
        border-right: none;
        border-bottom: none;
        border-top: 0px;
        height: 100vh;
        height: 100svh;
        overflow-y: auto;
        min-width: 350px;
        width: 33vw;
      `}

    ${isDesktop &&
    appName === constants_1.OOB_APPNAME &&
    `
        align-items: center;
        border: none;
        width: 50vw;
      `}
  `);
exports.ProductAndAboveContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
    ${(isIpad || isDesktop) &&
        `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px 20px 20px 20px;
        border-bottom: 1px solid #E0D7D5;
        min-height: 140px;
    `}
    ${isDesktop && appName === constants_1.OOB_APPNAME ? 'border: none;' : ''}
    `;
});
exports.Reset = styled_components_1.styled.div `
  margin-top: auto;
  margin-bottom: 17px;
`;
exports.ProductNameAndReset = styled_components_1.styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
exports.WrapperContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
    overflow: hidden;
     
     ${isMobile
        ? ' '
        : isDesktop && appName !== constants_1.OOB_APPNAME
            ? `  width: 100%;          
           `
            : isDesktop && appName === constants_1.OOB_APPNAME
                ? `max-width: 600px;
            width :100%;
             
             
           `
                : ''}
    `;
});
exports.AboveFormContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 10px 0;
        align-items: center;
        height: 70px;
        ${isMobile
        ? 'display: grid; grid-template-columns: 1fr auto 1fr'
        : isIpad
            ? 'padding: 0; gap:5px; height: auto;'
            : isDesktop
                ? 'padding: 0; gap:5px; height: auto;'
                : ''}

    `;
});
