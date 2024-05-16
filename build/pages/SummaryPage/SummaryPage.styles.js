"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSummary = exports.EditButton = exports.ActionButton = exports.ButtonsContainer = exports.AttributeThumbnail = exports.AttributeValue = exports.AttributeLabel = exports.AttributeWrapper = exports.ConfigurationSection = exports.ProductImgLoader = exports.ProductImg = exports.RecipeId = exports.Section = exports.ContentWrapper = exports.WrapperContainer = exports.ProductInfosContainer = exports.Container = void 0;
const styled_components_1 = require("styled-components");
const constants_1 = require("../../utils/constants");
const assets_1 = require("../../assets");
exports.Container = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
    display: flex;
    flex-direction: column;
    ${isMobile
    ? 'min-height: 100vh;'
    : isIpad
        ? `
            flex-direction: row;
            border-bottom: 1px solid #EBEBF0;
            min-height: 100vh;
            min-height: 100svh;
            min-width: 100vw;
             & > * {
              flex: 1;              
            }
          `
        : isDesktop
            ? `
            flex-direction: row;
            height: 100%;
            min-height: 100vh;
            min-height: 100svh;
            min-width: 100vw;
             & > * {
              flex: 1;              
            }
          `
            : ''}
  `);
exports.ProductInfosContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        display: absolute;
        top: 0;
        width: 100%;
        background-color: #fff;  
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
        height: 100px;
   
        ${isMobile ? ' ' : isIpad ? ' ' : isDesktop ? ' ' : ''}
          `;
});
exports.WrapperContainer = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
    
    display: flex;
    flex-direction: column;
    gap:48px;
     
     ${isMobile
        ? ''
        : `position:absolute;
         top: 50%;
         left: 50%;
         padding: 24px;
         transform: translate(-50%, -50%);
         width: 80%;
         height: 90%;
         justify-content: center;
           `}
    `;
});
exports.ContentWrapper = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        position:relative;
        display: flex;
        flex-direction: column;
        
        ${isMobile
        ? ' gap: 20px;padding:24px; width:100%;'
        : 'min-width:50%; align-items: center; '}
        }
          `;
});
exports.Section = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        
        
        ${isMobile
        ? ''
        : isIpad
            ? '  border: none ;'
            : isDesktop
                ? ' border: none ;'
                : ''}
        }
          `;
});
exports.RecipeId = styled_components_1.styled.div(() => `
        font-size: 13px;
        margin-left:10px;
        font-weight: 500;
        line-height: 1.4rem;
    `);
exports.ProductImg = styled_components_1.styled.div.withConfig({
    shouldForwardProp: (prop) => !['imageToDisplay'].includes(prop),
})(({ theme: { device: { isMobile }, }, imageToDisplay, }) => (0, styled_components_1.css) `
    background-color: #fff;
    background-image: ${imageToDisplay ? `url('${imageToDisplay}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    ${!isMobile ? `flex:2;` : ''}

    ${!isMobile ? `flex:2;` : ''}
  `);
exports.ProductImgLoader = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    // TODO: Change this to a dynamic url
    return `
        background-image: url('${assets_1.LV_LOADER}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100px;
        overflow: hidden;
        width: 100%;
        max-height: 100vh;
        background-color: #EFEFEF;
        ${isMobile ? ' height: 100%;' : ``}
          `;
});
exports.ConfigurationSection = (0, styled_components_1.styled)(exports.Section)(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: start;
        overflow-y: auto;
        ${isMobile ? 'padding-top: 15px;' : isIpad ? '' : isDesktop ? '' : ''}
    `;
});
exports.AttributeWrapper = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
   
        ${isMobile
        ? 'flex-basis: 48%; padding-bottom: 30px; gap: 15px;'
        : isIpad
            ? 'flex-direction: row; justify-content: space-between; padding: 15px; border-bottom: 1px solid #E0D7D5; align-items: center;'
            : isDesktop
                ? 'flex-direction: row; justify-content: space-between; padding: 15px; border-bottom: 1px solid #E0D7D5;align-items: center;'
                : ''}

        ${appName === constants_1.OOB_APPNAME && isDesktop
        ? `
            border-bottom: none;
            padding: 25px 20px;
          `
        : ''}
          `;
});
exports.AttributeLabel = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        text-wrap: balance;
        ${appName === constants_1.OOB_APPNAME && isDesktop
    ? `
            text-transform: capitalize;
          `
    : ''}
    `);
exports.AttributeValue = styled_components_1.styled.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => {
    return `
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        ${isMobile
        ? ' '
        : isIpad
            ? 'flex-direction: row-reverse;'
            : isDesktop
                ? 'flex-direction: row-reverse;'
                : ''}
        ${appName === constants_1.OOB_APPNAME && isDesktop
        ? `
            text-transform: capitalize;
            > img {
              width: 26px;
              border-radius: 50%;
            }
          `
        : ''}
          `;
});
exports.AttributeThumbnail = styled_components_1.styled.img(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
      width: 26px;
      height: 26px;
      border-radius: 5px;
      ${isMobile
        ? ''
        : isIpad
            ? 'width: 35px;'
            : isDesktop
                ? 'width: 35px;'
                : ''}
    `;
});
exports.ButtonsContainer = (0, styled_components_1.styled)(exports.Section)(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        
        ${isMobile
        ? 'margin: 10px 0;'
        : isIpad
            ? 'border:none; gap: 10px; padding: 5px 15px; margin: 15px 0;'
            : isDesktop
                ? 'border:none; gap: 10px; padding: 5px 15px; margin: 15px 0;'
                : ''}
          `;
});
exports.ActionButton = styled_components_1.styled.button(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        flex: 1;
        height: 60px;
        padding: 16px 24px;
        border-radius: 15px;
        cursor: pointer;
        > img {
            width: 20px;
        }
        > p {
            font-size: 17px;
            font-weight: 400;
            font-feature-settings: 'case' on;
            line-height: 1.4rem;
        }

        ${isMobile
    ? `box-shadow: 0 0 60px 0 #0000004D; border: none;`
    : isIpad
        ? `border-radius: 30px;`
        : isDesktop
            ? `border-radius: 30px;`
            : ``}
        ${appName === constants_1.CATALOGWECOM_APPNAME
    ? `
            border-radius: 8px;
            box-shadow: 0px 0px 26px 0px #00000033;
          `
    : ''}
    `);
exports.EditButton = (0, styled_components_1.styled)(exports.ActionButton)(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => `
   
  background-color: #fff;
  color: #000;
  font-family: LouisVuitton_Regular;
  font-size: 17px;
 
  ${isMobile
    ? ''
    : isIpad
        ? 'border: 1px solid #E6E6E6;'
        : isDesktop
            ? 'border: 1px solid #E6E6E6;'
            : ''}
  
  ${appName === constants_1.CATALOGDESKTOP_APPNAME
    ? isMobile
        ? ''
        : isIpad
            ? 'width: 90%; margin: auto;'
            : 'width: 100%;'
    : ''}
  };
  
`);
exports.TextSummary = styled_components_1.styled.div(() => `
        border-radius: 5px;
        font-size: 10px;
        font-weight: 500;
        min-width: 100%;
    `);
