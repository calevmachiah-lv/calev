"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrow = exports.ArrowContainer = exports.ViewDot = exports.ViewDotsContainer = void 0;
const assets_1 = require("../../assets");
const styled_components_1 = __importDefault(require("styled-components"));
exports.ViewDotsContainer = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => {
    return `
            display: flex;
            gap: 10px;
            padding-bottom: 10px;
      `;
});
exports.ViewDot = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isActive', 'isHelper'].includes(prop),
})(({ theme: { device: { isDesktop }, }, isActive, isHelper, }) => {
    return !isHelper
        ? `
          width: 12px;
          height: 12px;
          object-fit: contain;
          background-image: url(${isActive ? `${assets_1.DOT_ACTIVE}` : `${assets_1.DOT_INACTIVE}`});
          background-position: center;
          background-size: cover;
          cursor: pointer;
      `
        : `
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: ${isActive ? '#000' : '#A6A6A6'};
      cursor: pointer;
      ${isDesktop
            ? `
          height: 10px;
          width: 10px;
        `
            : ''}
  `;
});
exports.ArrowContainer = styled_components_1.default.div `
  ${({ theme: { device: { isIpad, isDesktop }, }, }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    top: calc(35% - 15px);
    width: 70%;
    min-width: 500px;
    max-width: 750px;
    padding: 0 5%;
    z-index: 999999;
  `}
`;
exports.Arrow = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['disable'].includes(prop),
}) `
  width: 48px;
  height: 48px;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disable ? '0' : '1')};
  cursor: ${(props) => (props.disable ? 'initial' : 'pointer')};

  > img {
    height: 16px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
