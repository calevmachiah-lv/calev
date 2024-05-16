"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepSlide = exports.DescriptionText = exports.DescriptionTitle = exports.StepTitle = exports.DescriptionContainer = exports.PictureContainer = exports.ContentContainer = exports.Icon = exports.TitleContainer = exports.Title = exports.InnerContainer = exports.Container = exports.Section = void 0;
const styled_components_1 = require("styled-components");
exports.Section = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
          ${isMobile
        ? `align-items: center;
              `
        : isIpad
            ? 'border: none;'
            : isDesktop
                ? 'border: none;'
                : ''}
            `;
});
exports.Container = (0, styled_components_1.styled)(exports.Section).withConfig({
    shouldForwardProp: (prop) => !['clientPage'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, open, }) => {
    return `
        transform-origin: 0 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        z-index: 99999;
        height: 100vh;
        overflow: hidden;
        transition: transform 0.5s;
        transform: ${open ? 'scaleY(1);' : 'scaleY(0);'}

        `;
});
exports.InnerContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, open, }) => {
    return `
    position: absolute;
    background-color: #FFFFFF;
    width: ${isMobile ? '100%;' : '50%;'}
    z-index: 99999;
    height: 95vh;
    bottom: 0;
    overflow: hidden;
    border-radius:20px 20px 0px 0px ;
    padding : 24px 24px 24px 24px;
    transition: all 0.3s ease-out;
    ${!isMobile ? 'transform: translate(-50%, 0%); left : 50%' : ''}
    `;
});
exports.Title = styled_components_1.styled.label(() => {
    return `
    font-size: 18px;
    color: #000000;
    font-family: LouisVuitton_Medium;


    `;
});
exports.TitleContainer = styled_components_1.styled.div(() => {
    return `
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    `;
});
exports.Icon = styled_components_1.styled.img `
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
exports.ContentContainer = styled_components_1.styled.div(() => {
    return `
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height:100%
    `;
});
exports.PictureContainer = styled_components_1.styled.div
    .attrs((props) => ({}))
    .withConfig({
    shouldForwardProp: (prop) => !['image', 'slideDirection'].includes(prop),
}) `
  ${({ image, slideDirection }) => `
    position:relative ;
    flex: 2;
    width: 100% ;
    background-color: #EFEFEF;
    background-image: url(${image});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
     @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
      }

      @keyframes slideInFromLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
      }
    animation: ${slideDirection === 'next' ? 'slideInFromRight' : 'slideInFromLeft'} 0.5s forwards;
    `}
`;
exports.DescriptionContainer = styled_components_1.styled.div(() => {
    return `
    margin-top: 20px;
    display:flex;
    flex-direction:column;
    flex: 1;
    width:100%;
    @keyframes opacityAnimation {
      from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
    }
  animation: opacityAnimation 0.5s forwards;
    `;
});
exports.StepTitle = styled_components_1.styled.label(() => {
    return `
       font-size: 10px;
       line-height: 16px;
       font-family: LouisVuitton_Regular;

    `;
});
exports.DescriptionTitle = styled_components_1.styled.label(() => {
    return `
         font-size: 18px;
         line-height: 24px;
         font-family: LouisVuitton_Demi;
         color:#000000;
  
      `;
});
exports.DescriptionText = styled_components_1.styled.text(() => {
    return `
    padding-top :10px;
    font-size: 16px    ;
    line-height: 24px;
    font-family: LouisVuitton_Regular;
    color:#000000;
    `;
});
exports.StepSlide = styled_components_1.styled.div
    .attrs((props) => ({}))
    .withConfig({
    shouldForwardProp: (prop) => !['isActive'].includes(prop),
}) `
  ${({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, isActive, }) => `
  display: ${isActive ? '' : 'none'};
  `}
`;
