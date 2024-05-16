"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon360 = exports.ElsePhoto = exports.ElsePhotoWrapper = exports.ElsePhotosWrapper = exports.MainPhoto = exports.PlayerWrapper = exports.MainPhotoWrapper = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => `
  display: flex;
  flex-direction: column;
  width: 100vw;
  ${isMobile
    ? ''
    : isIpad
        ? 'border-right: 1px solid #e0d7d5; width: 50vw;'
        : isDesktop
            ? 'border-right: 1px solid #e0d7d5; width: 50vw;'
            : ''}
`);
exports.MainPhotoWrapper = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
exports.PlayerWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, playerSelected, }) => `
  opacity: ${!playerSelected ? 0 : 1};
  z-index: ${!playerSelected ? -10 : 0};
  position: ${!playerSelected ? 'absolute' : 'relative'};
  height: 45vh;
  height: 45svh;
  transition: opacity 0.3s ease-in-out;
  ${isMobile ? '' : isIpad ? 'height: 100%;' : isDesktop ? 'height: 100%;' : ''}
  `);
exports.MainPhoto = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, hidePhoto, image, }) => `
  width: 100%;
  background-image: url('${image}');
  opacity: ${hidePhoto ? 0 : 1};
  position: ${hidePhoto ? 'absolute' : ''};
  z-index: ${hidePhoto ? -10 : 0};
  object-fit: contain;
  height: 45vh;
  height: 45svh;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease-in-out;
  ${isMobile ? '' : isIpad ? 'height: 100%;' : isDesktop ? 'height: 100%;' : ''}
`);
exports.ElsePhotosWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e0d7d5;
  border-bottom: 1px solid #e0d7d5;
`;
exports.ElsePhotoWrapper = styled_components_1.default.div(({ theme: { appName }, width, selected }) => `
  position: relative;
  max-width: ${width};
  min-width: 15vh;
  min-height: 15vh;
  cursor: pointer;
  height: 100%;
  display: flex;
  border-right: 1px solid #fff;
  border-left: none;
  &:last-child {
    border-right: none;
  }
    ${!selected ? 'opacity: 0.5;' : ''}
  `);
exports.ElsePhoto = styled_components_1.default.div(({ imageToDisplay }) => `
  width: 100%;
  object-fit: contain;
  background-image: url('${imageToDisplay}');
  background-color: #efefef;
  background-position: center;
  background-size: cover;
  `);
exports.Icon360 = styled_components_1.default.img `
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
`;
