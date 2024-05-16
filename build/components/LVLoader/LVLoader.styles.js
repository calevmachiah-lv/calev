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
exports.LoaderContainerItem = exports.LoaderContainer = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const constants_1 = require("../../utils/constants");
exports.LoaderContainer = styled_components_1.default.div
    .attrs((props) => ({}))
    .withConfig({
    shouldForwardProp: (prop) => !['currentMode', 'playerSize'].includes(prop),
}) `
  ${({ theme: { device: { isMobile }, }, currentMode, playerSize: { height, width }, }) => (0, styled_components_1.css) `
    position: absolute;
    top: ${currentMode === '2D' || !isMobile ? '50%' : `calc(25% + 70px)`};
    left: ${currentMode === '3D' && !isMobile ? `34%` : `50vw`};
    [dir='rtl'] & {
      left: ${currentMode === '3D' && !isMobile ? `66%` : `50vw`};
    }
    width: ${currentMode === '3D' && !isMobile ? '50vw' : '100vw'};
    height: ${!isMobile
    ? '10vw'
    : currentMode === '3D'
        ? `${height}px`
        : '100vh'};
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${currentMode === '3D' ? 'transparent' : '#ffffff'};
    z-index: ${currentMode === '3D' ? '1' : '0'};

    img {
      max-width: 100px;
      max-height: 100px;
    }

    .label {
      font-weight: bold;
      font-size: 12px;
    }
  `}
`;
exports.LoaderContainerItem = styled_components_1.default.div `
  ${({ theme }) => (0, styled_components_1.css) `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(230, 230, 230, 0.5);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${theme.device.isDesktop &&
    theme.appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      border: 1px solid transparent;
      border-radius: 100px;
    `}

    img {
      max-width: 100%;
      max-height: 100%;
    }
  `}
`;
