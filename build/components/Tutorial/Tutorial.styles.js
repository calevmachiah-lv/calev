"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrow = exports.ArrowContainer = exports.DescriptionText = exports.DescriptionContainer = exports.Container = exports.StepTitle = exports.ProductImg = exports.ProductLeadTime = exports.ProductPrice = exports.CopyButton = exports.ShareButton = exports.RecipeId = exports.StepLabel = exports.TopSection = exports.Section = exports.InnerWrapper = exports.ShareAndLeadtime = exports.StepSlide = exports.Wrapper = exports.CopyImg = exports.TutorialContainer = void 0;
const styled_components_1 = require("styled-components");
const constants_1 = require("../../utils/constants");
exports.TutorialContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
          top:0;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          z-index: 9;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: max-content;
          font-size: 20px;
          font-weight: bold;
          padding: 10px;
          height: 100px;
     
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
exports.CopyImg = styled_components_1.styled.img `
  transform: translate(0%, 20%);
  cursor: pointer;
`;
exports.Wrapper = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
          
          ${isMobile ?
        `          
            position: absolute;
            width: 90%;
            bottom: 40%;
            left: 50%;
            transform: translate(-50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-height: 16px;
            gap: 30px;
            @media (min-width: 768px) {
                bottom: 35%;
            }

            `
        : ``}
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
exports.ShareAndLeadtime = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `  
                justify-content: inherit;
                display: flex;
                flex-direction: column;
                align-items: end;
                gap:10px;
      
          ${isMobile ? '' : isIpad ? `` : isDesktop ? ` ` : ''}
            `;
});
exports.InnerWrapper = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
          
          display: flex;
          flex-direction: row;
          gap: 3px;      
          
          ${isMobile ? '' : isIpad ? '' : isDesktop ? '  ' : ''}
            `;
});
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
exports.TopSection = (0, styled_components_1.styled)(exports.Section)(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
          display: flex;          
          
          justify-content: space-between;
          ${isMobile
        ? 'flex-wrap: wrap; '
        : isIpad
            ? ` border-bottom: 1px solid #EBEBF0;
                    padding :15px; 
                    `
            : isDesktop
                ? ` 
                   padding :15px; 
                `
                : ''}
            `;
});
exports.StepLabel = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          line-height: 1.4rem;       
          font-feature-settings: 'case' on;
          color: #FFFFFF;
          ${isDesktop && appName === constants_1.OOB_APPNAME
        ? `
              font-size: 12px;
              font-weight: 500;
              line-height: 15px;
              font-family: LouisVuitton_Medium;
          `
        : ''}
      `;
});
exports.RecipeId = styled_components_1.styled.div(() => `
          font-size: 13px;
          margin-left:10px;
          font-weight: 500;
          line-height: 1.4rem;
      `);
exports.ShareButton = styled_components_1.styled.img(() => `
          width: 25px;      
      `);
exports.CopyButton = styled_components_1.styled.img(() => `
          width: 25px;
      `);
exports.ProductPrice = styled_components_1.styled.div(() => `
          font-size: 17px;
          font-weight: 500;
          line-height: 1.6rem;
          padding-top: 10px;
          font-family: LouisVuitton_Medium;

      `);
exports.ProductLeadTime = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
  
      padding: 6px 13px;
      border-radius: 35px;
      background-color: #F5F5F3;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      width: auto;
      height: 40px;
      >span {
          font-weight: 600;
      }
          ${isMobile ? `height: 33px;` : isIpad ? `` : isDesktop ? `` : ``}
            `;
});
exports.ProductImg = styled_components_1.styled.img(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
  
          width: 100%;
          object-fit: contain;
  
     
          ${isMobile
        ? ' height: 50%; '
        : isIpad
            ? ' width: 50%; border-right: 1px solid #EBEBF0;'
            : isDesktop
                ? '  width: 50%;  border-right: 1px solid #EBEBF0;'
                : ''}
            `;
});
exports.StepTitle = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
          font-size: 24px;
          font-family: 'LouisVuitton_Regular';
          color: #FFFFFF;
          font-weight: 500;
      `;
});
exports.Container = (0, styled_components_1.styled)(exports.Section).withConfig({
    shouldForwardProp: (prop) => !['clientPage'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, clientPage, }) => {
    return `
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        z-index: 99999;
        height: 100vh;
        overflow: hidden;
        `;
});
exports.DescriptionContainer = (0, styled_components_1.styled)(exports.Section).withConfig({
    shouldForwardProp: (prop) => !['clientPage'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, clientPage, }) => {
    return `
        display: flex;
        justify-content: space-between;
        @keyframes opacityAnimation {
            from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
          }
        animation: opacityAnimation 0.5s forwards;

        ${isMobile
        ? `flex-wrap: wrap;
              ${clientPage ? 'padding: 20px 10px !important;' : ''}`
        : isIpad
            ? `
                padding: 30px 20px 20px 20px;
                `
            : isDesktop
                ? `
                 padding: 30px 20px 20px 20px;
              `
                : ''}

      ${appName === constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
          border-bottom: none;
        `}

        ${appName === constants_1.OOB_APPNAME && isDesktop && clientPage
        ? `
            padding-top: 0;
            `
        : ''}
          `;
});
exports.DescriptionText = styled_components_1.styled.p.attrs((props) => ({})) `
  ${({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
    position: absolute;
    bottom: ${isMobile ? '20%' : '10%'};
    left: 50%;
    transform: translate(-50%);
    margin: 0;
    width:90%; 
    text-align: center;
    overflow: hidden;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 24px;
    font-family: LouisVuitton_Regular;
    font-feature-settings: 'case' on;
    overflow-y: auto;
    font-weight: 400;
    transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    margin 0.3s ease-in-out;
    
    ${!isMobile && `
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%);
    margin: 0;
    width:50%; 
`};
  `}
`;
exports.ArrowContainer = styled_components_1.styled.div(({ theme: { device: { isIpad, isDesktop }, }, }) => {
    return `
      position: absolute;
      display:flex;
      flex-direction:row;
      padding: 0 5%;
      left: 0;
      top: 100px;;
      width: 100%;
      z-index:999999;
      ${isDesktop
        ? `justify-content:space-between; gap:50%;`
        : isIpad
            ? `justify-content:space-between; gap:50%`
            : ''};
    left: 0;
    top: calc(((100vh - 15vh)/2) + 10px);
  `;
});
exports.Arrow = styled_components_1.styled.div `
  width: 10px;
  height: 10px;
  object-fit: contain;
  cursor: pointer;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  grab: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
`;
