"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceShimmer = exports.StyledProductPrice = void 0;
const styled_components_1 = require("styled-components");
exports.StyledProductPrice = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        line-height: 18px;
        font-size: 14px;
        font-weight: 400;
        font-family: LouisVuitton_Regular;
        color: #A6A6A6;
        min-width: 10px;
        ${isMobile
        ? 'padding-top: 0px;'
        : isIpad
            ? 'color: #000;'
            : isDesktop
                ? 'color: #000;'
                : ''}

    `;
});
exports.ProductPriceShimmer = styled_components_1.styled.div(() => {
    return `
    padding: 9px 30px;
    border-radius: 100px;
    max-width: 60px;
  
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
