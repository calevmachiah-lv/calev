"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeName = exports.Image = exports.CircleImage = exports.CircleContainer = exports.AttributeCircleContainer = void 0;
const styled_components_1 = __importStar(require("styled-components"));
exports.AttributeCircleContainer = styled_components_1.default.div.withConfig({
    shouldForwardProp: (props) => !['isActive'].includes(props),
}) `
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  @media (orientation: landscape) {
    gap: 5%;
    max-width: unset;
  }
`;
exports.CircleContainer = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['inStock', 'img', 'isSelected', 'isTutorialCurrentStep'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, inStock, img, isSelected, isTutorialCurrentStep, }) => {
    return `
  position: relative;
  width: 100%;
  max-width: 60px;
  background-image: url(${img});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${isSelected ? '#F5F5F5' : ''};
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  cursor: pointer;

  ${isTutorialCurrentStep
        ? (0, styled_components_1.css) `
          background-image: url('');
          background-color: transparent;
          border-color: #ffffff;
          z-index: 9999999;
          border-style: double;
          border-width: 6px;
        `
        : ''}
  
  &::before {
    content: '';
    position: absolute;
    top: 3%;
    right: 5%;
    width: 10px;
    height: 10px;
    aspect-ratio: 1/1;
    background-color: ${inStock ? 'transparent' : '#C53929'};
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  @media (orientation: landscape) {
    width: unset;
    max-height: 60%;
  }
`;
});
exports.CircleImage = styled_components_1.default.div `
  border-radius: 50%;
  border: none;
  width: 90%;
  height: 90%;
`;
exports.Image = styled_components_1.default.img `
  visibility: hidden;
  width: 100%;
  @media (orientation: landscape) {
    width: 40px;
    height: 40px;
  }
`;
exports.AttributeName = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isTutorialCurrentStep'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, isTutorialCurrentStep, isActive, }) => {
    return `
    font-size: 14px;
  font-weight: 500;
  color: ${isTutorialCurrentStep ? '#FFFFFF' : '#000000'};
  z-index: ${isTutorialCurrentStep ? '9999999' : '9'};
  text-align: center;
  text-wrap: balance;
  @media (orientation: landscape) {
    text-wrap: nowrap;
    margin-bottom: 21px;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 1px;
      background-color: black;
      transition: width 0.3s ease;
      ${isActive && `width: 100%;`}
    }
  }
`;
});
