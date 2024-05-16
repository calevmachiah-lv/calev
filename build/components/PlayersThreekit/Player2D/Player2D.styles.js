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
exports.StepPicture = exports.Picture = exports.Wrapper = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const constants_1 = require("../../../utils/constants");
exports.Wrapper = styled_components_1.default.div
    .attrs(({ theme, isRotable, conditionalCSS, displayTutorial, height }) => ({
    style: {
        cursor: isRotable ? 'grab' : 'default',
        borderRight: theme.device.isMobile ? 'none' : '1px solid #ccc',
        height: height ? height : theme.device.isMobile ? '' : '100vh',
        maxHeight: height ? height : theme.device.isMobile ? '' : '100vh',
        flex: !theme.device.isMobile ? '2 0' : '2 0',
    },
}))
    .withConfig({
    shouldForwardProp: (prop) => ![
        'isRotable',
        'conditionalCSS',
        'fullScreen',
        'displayTutorial',
    ].includes(prop),
})(({ fullScreen, displayTutorial }) => `
  position: ${fullScreen ? '' : 'relative'};
  user-select: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:active {
    cursor: grabbing;
  }

  #${constants_1.TK_PLAYER_DIV_ID_2D}, #${constants_1.TK_PLAYER_DIV_ID_3D} {
      height: ${fullScreen ? '100vh' : '100%'};
      width: ${fullScreen ? '100vw' : '100%'};
      position: ${fullScreen ? 'absolute' : 'relative'};
      top: ${fullScreen ? '0' : ''};
      left: ${fullScreen ? '0' : ''};
      background-color: ${fullScreen ? 'white' : 'transparent'};
      z-index: ${fullScreen ? 9999999 : 0};
      overflow: hidden;
      opacity: ${displayTutorial ? '0' : '1'};

      @media (max-width: 768px) {
        min-height: 40%;
        transform: translate(0%, 0%);
      }

      div[class*='threekit'] {
        div[class*='holder'] {
          div[class*='player'] {
            div[class*='logo'] {
              display: none;
            }
          }
        }
      }
    }
`);
exports.Picture = styled_components_1.default.img
    .attrs((props) => ({}))
    .withConfig({
    shouldForwardProp: (prop) => !['slideDirection'].includes(prop),
}) `
  ${({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, slideDirection, }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    width: 70%;
    min-width: 300px;
    max-width: 500px;
    justify-content: center;

    @media (min-width: 767px){
      ${isMobile
    ? (0, styled_components_1.css) `
              width: 70%;
            `
    : (0, styled_components_1.css) `
              width: 50%;
            `}
    }
  `}
`;
exports.StepPicture = styled_components_1.default.img
    .attrs((props) => ({}))
    .withConfig({
    shouldForwardProp: (prop) => !['slideDirection'].includes(prop),
}) `
  ${({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, slideDirection, }) => `
    z-index: 999999;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    border-radius: 5px;
    min-width: 300px;
    max-width: 500px;
    justify-content: center;
    transform: translate(-50%, -50%);

    @keyframes slideInFromRight {
        from {
            transform: translate(100%, -50%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
      }
  
      @keyframes slideInFromLeft {
        from {
            transform: translate(-100%, -50%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
      }
    animation: ${slideDirection === 'next' ? 'slideInFromRight' : 'slideInFromLeft'} 0.5s forwards;

    @media (min-width: 767px){
      ${isMobile
    ? (0, styled_components_1.css) `
              width: 70%;
            `
    : (0, styled_components_1.css) `
              width: 50%;
            `}
    }

  `}
`;
