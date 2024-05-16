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
exports.LoadingText = exports.ButtonWrapper = exports.LoaderWrapper = exports.Dot = exports.bounce = exports.ButtonContainerShimmer = exports.LabelBold = exports.ButtonContainer = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const constants_1 = require("../../../utils/constants");
const assets_1 = require("../../../assets");
const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#E6E6E6',
    darkGray: '#2C2C2E',
    darkBrown: '#18110C',
    softWhite: '#F5F5F3',
    mediumGray: '#E1E1E1',
};
const FONT_SIZES = {
    small: '14px',
    medium: '17px',
};
const baseButtonStyle = (0, styled_components_1.css) `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  color: ${COLORS.black};
  font-size: ${FONT_SIZES.small};
  font-weight: 400;
  background-color: ${COLORS.white};
  padding: 10px 13px;
  font-family: 'LouisVuitton_Regular';
`;
const disabledStyle = (0, styled_components_1.css) `
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
`;
const responsivePaddingStyle = ({ isIpad, isDesktop }) => (0, styled_components_1.css) `
  ${isIpad || isDesktop ? 'padding: 10px 20px;' : ''}
`;
const addtoBagButtonStyle = ({ isMobile, isIpad, isDesktop, appName, }) => (0, styled_components_1.css) `
  background-color: ${COLORS.darkBrown};
  border: none;
  color: ${COLORS.white};
  height: 48px;
  border-radius: 24px;
  width: 100%;
  text-transform: capitalize;
  font-size: ${FONT_SIZES.small};
`;
const modifyButtonStyle = ({ isMobile }) => (0, styled_components_1.css) `
  border-radius: 100px;
  border: 1px solid transparent;
  width: 100%;
  height: 48px;
  color: ${COLORS.black};
  font-size: ${FONT_SIZES.small};
  font-family: 'LouisVuitton_Medium';
  text-transform: capitalize;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, #d5e47e, #9dcdd9, #e39cbc) border-box;
`;
const shareButtonStyle = ({ isMobile, isDesktop, appName }) => (0, styled_components_1.css) `
  border: none;
  padding: 0;
  > img {
    width: 16px;
  }
`;
const wishButtonStyle = ({ isMobile, isDesktop, appName }) => (0, styled_components_1.css) `
  border: none;
  padding: 0;
  > img {
    width: 16px;
  }
`;
const doneButtonStyle = ({ isMobile, displayTutorial, disabled, }) => (0, styled_components_1.css) `
  justify-content: center;
  font-size: 13px;
  width: 100%;
  height: 48px;
  background-color: ${disabled && !displayTutorial
    ? COLORS.mediumGray
    : COLORS.darkBrown};
  color: ${disabled ? '#767676' : COLORS.white};
  border-radius: 70px;
  font-size: ${FONT_SIZES.small};
  text-transform: capitalize;
  border: 1px solid transparent;

  ${displayTutorial &&
    (0, styled_components_1.css) `
    border-color: #ffffff;
    z-index: 9999999;
    border-style: double;
    border-width: 6px;
  `}
`;
const surpriseButtonStyle = ({ isMobile }) => (0, styled_components_1.css) `
  border-radius: 70px;
  border: 1px solid transparent;
  width: 100%;
  height: 48px;
  color: ${COLORS.black};
  font-size: ${FONT_SIZES.small};
  font-family: 'LouisVuitton_Medium';
  text-transform: capitalize;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00ff47, #00fff0, #6c5eec, #ff00e6) border-box;
`;
const inStockButtonStyle = ({ isMobile }) => (0, styled_components_1.css) `
  > img {
    width: 20px;
  }
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  padding: 10px;
  cursor: initial;

  ${!isMobile ? 'padding: 10px 20px;' : ''}
`;
const leadTimeButtonStyle = ({ isMobile, summaryPage, }) => (0, styled_components_1.css) `
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  padding: 10px;
  cursor: initial;
  width: max-content;
  max-width: 40vw;
  margin-right: 10px;

  ${!isMobile ? 'padding: 10px 20px; margin-right: 0px;' : ''}

  ${summaryPage
    ? (0, styled_components_1.css) `
        border: none;
        background-color: ${COLORS.softWhite};
        border-radius: 35px;
        padding: 6px 13px;

        ${!isMobile ? 'padding: 10px 20px; border-radius: 100px;' : ''}
      `
    : ''}
`;
const resetButtonStyle = ({ isMobile, isDesktop, appName }) => (0, styled_components_1.css) `
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  > img {
    width: 15px;
  }
  ${isMobile &&
    (0, styled_components_1.css) `
    padding: 8px;
    > img {
      width: 18px;
    }
  `}

  ${isMobile
    ? 'position: absolute; top: 2vmin; [dir = "ltr"] &{right: 10px;} [dir = "rtl"] & {left: 2vmin;}'
    : isDesktop && appName === 'OOB_APPNAME'
        ? 'border: none; flex-direction: row-reverse;'
        : 'border: 1px solid ${COLORS.lightGray};'}
`;
const closeButtonStyle = ({ isMobile, isDesktop, appName }) => (0, styled_components_1.css) `
  border-radius: 100px;
  background-color: transparent;
  border: 1px solid ${COLORS.lightGray};
  padding: 8px;
  width: 32px;
  height: 32px;
  > img {
    width: 12px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  position: absolute;
  top: 3vmin;
  right: 3vmin;

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    > img {
      width: 16px;
    }
  }
`;
const zoomButtonStyle = ({ isIpad, isDesktop, appName, isMobile, isFullScreen, }) => (0, styled_components_1.css) `
  position: ${isMobile && !isFullScreen ? '' : 'absolute'};
  bottom: ${isFullScreen && isMobile
    ? ''
    : isFullScreen && !isMobile
        ? '3vmin'
        : '18vmin'};
  top: ${isFullScreen && isMobile ? '3vmin' : ''};
  z-index: ${isFullScreen ? 99999999 : ''};
  right: 3vmin;
  padding: 7px;
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  > img {
    width: 20px;
  }
  ${isMobile
    ? 'margin-left: auto; width: max-content;'
    : isDesktop && appName === 'OOB_APPNAME'
        ? 'border: none; flex-direction: row-reverse;'
        : `border: 1px solid ${COLORS.lightGray};`}
`;
const helpButtonStyle = ({ isIpad, isDesktop, appName, isMobile, isFullScreen, }) => (0, styled_components_1.css) `
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 24px;
  background-image: url(${assets_1.HELPER_ICON});
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;
  font-size: 0;
`;
const infoZoomButtonStyle = ({ isIpad, isDesktop, appName, isMobile, }) => (0, styled_components_1.css) `
  position: absolute;
  bottom: 10%;
  left: 50%;
  cursor: initial;
  z-index: 99999999;
  padding: 20px;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  transform: translate(-50%, -50%);
  border-radius: 100px;
  border: 1px dashed ${COLORS.lightGray};
  > img {
    width: 20px;
  }

  ${isMobile
    ? 'margin-left: auto;'
    : isDesktop && appName === 'OOB_APPNAME'
        ? 'border: none; flex-direction: row-reverse;'
        : 'border: 1px solid ${COLORS.lightGray};'}
`;
const editButtonStyle = ({ isMobile, isIpad, isDesktop, appName, }) => (0, styled_components_1.css) `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
  height: 60px;
  padding: 16px 24px;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  font-family: 'LouisVuitton_Regular';
  font-size: 17px; // Overriding the base font size
  font-weight: 400;
  font-feature-settings: 'case' on;
  line-height: 1.4rem;

  > img {
    width: 20px;
  }
  > p {
    font-size: 17px;
    font-weight: 400;
    font-feature-settings: 'case' on;
    line-height: 1.4rem;
  }

  ${isMobile ? 'box-shadow: 0 0 60px 0 #0000004D; border: none;' : ''}
  ${isIpad || isDesktop ? 'border-radius: 30px;' : ''}
  ${appName === constants_1.CATALOGWECOM_APPNAME
    ? 'border-radius: 8px; box-shadow: 0px 0px 26px 0px #00000033;'
    : ''}
  ${appName === constants_1.CATALOGDESKTOP_APPNAME &&
    !isMobile &&
    (isIpad ? 'width: 90%; margin: auto;' : 'width: 100%;')}
  ${!isMobile && (isIpad || isDesktop) ? 'border: 1px solid #E6E6E6;' : ''}
`;
exports.ButtonContainer = styled_components_1.default.button.withConfig({
    shouldForwardProp: (prop) => ![
        'buttonName',
        'summaryPage',
        'clientPage',
        'disabled',
        'isFullScreen',
        'displayTutorial',
    ].includes(prop),
})(({ theme, buttonName, summaryPage, disabled, isFullScreen, displayTutorial, }) => (0, styled_components_1.css) `
    ${baseButtonStyle}
    ${disabled && buttonName !== constants_1.DONE_BUTTON_LABEL && disabledStyle}
    ${responsivePaddingStyle(theme === null || theme === void 0 ? void 0 : theme.device)}
    ${buttonName === constants_1.ADDTOBAG_BUTTON_LABEL &&
    addtoBagButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.MODIFY_BUTTON_LABEL &&
    modifyButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.SHARE_BUTTON_LABEL &&
    shareButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.WISH_BUTTON_LABEL &&
    wishButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.DONE_BUTTON_LABEL &&
    doneButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName, displayTutorial,
        disabled }))}
    ${buttonName === constants_1.SURPRISE_ME_BUTTON_LABEL &&
    surpriseButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.INSTOCK_BUTTON_LABEL &&
    inStockButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.LEADTIME_BUTTON_LABEL &&
    leadTimeButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName, summaryPage: Boolean(summaryPage) }))}
    ${buttonName === constants_1.RESET_BUTTON_LABEL &&
    resetButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.HELPER_BUTTON_LABEL &&
    helpButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.CLOSE_BUTTON_LABEL &&
    closeButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.ZOOM_BUTTON_LABEL &&
    zoomButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName, isFullScreen }))}
    ${buttonName === constants_1.INFO_ZOOM_BUTTON_LABEL &&
    infoZoomButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
    ${buttonName === constants_1.EDIT_BUTTON_LABEL &&
    editButtonStyle(Object.assign(Object.assign({}, theme === null || theme === void 0 ? void 0 : theme.device), { appName: theme === null || theme === void 0 ? void 0 : theme.appName }))}
  `);
exports.LabelBold = styled_components_1.default.span(() => {
    return `
  font-weight: 600;
`;
});
exports.ButtonContainerShimmer = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => {
    return `
    max-width: 33vw;
  ${isMobile
        ? `
  border-radius: 30px;
  padding: 18px 36px;
`
        : `
  border-radius: 100px;
  padding: 17px 45px;
`}

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
exports.bounce = (0, styled_components_1.keyframes) `
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
  `;
exports.Dot = styled_components_1.default.div(({ theme: { device: { isMobile }, }, delay, }) => (0, styled_components_1.css) `
    height: 2px;
    width: 2px;
    margin: 4px 5px;
    background-color: ${isMobile ? COLORS.black : COLORS.white};
    border-radius: 50%;
    animation: ${exports.bounce} 1.5s infinite ease-in-out;
    animation-delay: ${delay};
  `);
exports.LoaderWrapper = styled_components_1.default.div `
  display: flex;
  align-items: flex-end;
`;
exports.ButtonWrapper = styled_components_1.default.div `
  display: flex;
  gap: 5px;
  width: max-content;
  > img {
    width: 20px;
  }
  > p {
    width: max-content;
  }
`;
exports.LoadingText = styled_components_1.default.span(({ theme: { device: { isMobile }, }, }) => (0, styled_components_1.css) `
    margin-left: 10px;
    font-family: 'LouisVuitton_Regular';
    align-items: flex-end;
    color: ${isMobile ? COLORS.black : COLORS.white};
  `);
