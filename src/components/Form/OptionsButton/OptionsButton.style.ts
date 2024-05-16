import styled, { css, keyframes } from 'styled-components';
import {
  ADDTOBAG_BUTTON_LABEL,
  CATALOGDESKTOP_APPNAME,
  CATALOGWECOM_APPNAME,
  CLOSE_BUTTON_LABEL,
  EDIT_BUTTON_LABEL,
  DONE_BUTTON_LABEL,
  INFO_ZOOM_BUTTON_LABEL,
  INSTOCK_BUTTON_LABEL,
  LEADTIME_BUTTON_LABEL,
  OOB_APPNAME,
  RESET_BUTTON_LABEL,
  SHARE_BUTTON_LABEL,
  ZOOM_BUTTON_LABEL,
  HELPER_BUTTON_LABEL,
  SURPRISE_ME_BUTTON_LABEL,
  MODIFY_BUTTON_LABEL,
  WISH_BUTTON_LABEL,
} from '../../../utils/constants';
import { HELPER_ICON } from '../../../assets';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#E6E6E6',
  darkGray: '#2C2C2E',
  darkBrown: '#18110C',
  softWhite: '#F5F5F3',
  mediumGray: '#E1E1E1',
};

interface IDevice {
  isIpad?: boolean;
  isDesktop?: boolean;
  isMobile?: boolean;
  appName?: string;
  isFullScreen?: boolean;
  displayTutorial?: boolean;
  disabled?: boolean;
}

const FONT_SIZES = {
  small: '14px',
  medium: '17px',
};

const baseButtonStyle = css`
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

const disabledStyle = css`
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
`;

const responsivePaddingStyle = ({ isIpad, isDesktop }: IDevice) => css`
  ${isIpad || isDesktop ? 'padding: 10px 20px;' : ''}
`;

const addtoBagButtonStyle = ({
  isMobile,
  isIpad,
  isDesktop,
  appName,
}: IDevice) => css`
  background-color: ${COLORS.darkBrown};
  border: none;
  color: ${COLORS.white};
  height: 48px;
  border-radius: 24px;
  width: 100%;
  text-transform: capitalize;
  font-size: ${FONT_SIZES.small};
`;

const modifyButtonStyle = ({ isMobile }: IDevice) => css`
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

const shareButtonStyle = ({ isMobile, isDesktop, appName }: IDevice) => css`
  border: none;
  padding: 0;
  > img {
    width: 16px;
  }
`;
const wishButtonStyle = ({ isMobile, isDesktop, appName }: IDevice) => css`
  border: none;
  padding: 0;
  > img {
    width: 16px;
  }
`;

const doneButtonStyle = ({
  isMobile,
  displayTutorial,
  disabled,
}: IDevice) => css`
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
  css`
    border-color: #ffffff;
    z-index: 9999999;
    border-style: double;
    border-width: 6px;
  `}
`;

const surpriseButtonStyle = ({ isMobile }: IDevice) => css`
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

const inStockButtonStyle = ({ isMobile }: IDevice) => css`
  > img {
    width: 20px;
  }
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  padding: 10px;
  cursor: initial;

  ${!isMobile ? 'padding: 10px 20px;' : ''}
`;

interface IDeviceWithSummaryPage extends IDevice {
  summaryPage: boolean;
}

const leadTimeButtonStyle = ({
  isMobile,
  summaryPage,
}: IDeviceWithSummaryPage) => css`
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  padding: 10px;
  cursor: initial;
  width: max-content;
  max-width: 40vw;
  margin-right: 10px;

  ${!isMobile ? 'padding: 10px 20px; margin-right: 0px;' : ''}

  ${summaryPage
    ? css`
        border: none;
        background-color: ${COLORS.softWhite};
        border-radius: 35px;
        padding: 6px 13px;

        ${!isMobile ? 'padding: 10px 20px; border-radius: 100px;' : ''}
      `
    : ''}
`;

const resetButtonStyle = ({ isMobile, isDesktop, appName }: IDevice) => css`
  border-radius: 100px;
  border: 1px solid ${COLORS.lightGray};
  > img {
    width: 15px;
  }
  ${isMobile &&
  css`
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

const closeButtonStyle = ({ isMobile, isDesktop, appName }: IDevice) => css`
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

const zoomButtonStyle = ({
  isIpad,
  isDesktop,
  appName,
  isMobile,
  isFullScreen,
}: IDevice) => css`
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

const helpButtonStyle = ({
  isIpad,
  isDesktop,
  appName,
  isMobile,
  isFullScreen,
}: IDevice) => css`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 24px;
  background-image: url(${HELPER_ICON});
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

const infoZoomButtonStyle = ({
  isIpad,
  isDesktop,
  appName,
  isMobile,
}: IDevice) => css`
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

const editButtonStyle = ({
  isMobile,
  isIpad,
  isDesktop,
  appName,
}: IDevice) => css`
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
  ${appName === CATALOGWECOM_APPNAME
    ? 'border-radius: 8px; box-shadow: 0px 0px 26px 0px #00000033;'
    : ''}
  ${appName === CATALOGDESKTOP_APPNAME &&
  !isMobile &&
  (isIpad ? 'width: 90%; margin: auto;' : 'width: 100%;')}
  ${!isMobile && (isIpad || isDesktop) ? 'border: 1px solid #E6E6E6;' : ''}
`;

interface ButtonContainerProps {
  theme?: {
    device: { isMobile: boolean; isIpad: boolean; isDesktop: boolean };
    appName: string;
  };
  buttonName?: string;
  summaryPage?: boolean;
  clientPage?: boolean;
  disabled?: boolean;
  isFullScreen?: boolean;
  displayTutorial?: boolean;
}

export const ButtonContainer = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'buttonName',
      'summaryPage',
      'clientPage',
      'disabled',
      'isFullScreen',
      'displayTutorial',
    ].includes(prop),
})<ButtonContainerProps>(
  ({
    theme,
    buttonName,
    summaryPage,
    disabled,
    isFullScreen,
    displayTutorial,
  }: ButtonContainerProps) => css`
    ${baseButtonStyle}
    ${disabled && buttonName !== DONE_BUTTON_LABEL && disabledStyle}
    ${responsivePaddingStyle(theme?.device as IDevice)}
    ${buttonName === ADDTOBAG_BUTTON_LABEL &&
    addtoBagButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === MODIFY_BUTTON_LABEL &&
    modifyButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === SHARE_BUTTON_LABEL &&
    shareButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === WISH_BUTTON_LABEL &&
    wishButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === DONE_BUTTON_LABEL &&
    doneButtonStyle({
      ...theme?.device,
      appName: theme?.appName,
      displayTutorial,
      disabled,
    })}
    ${buttonName === SURPRISE_ME_BUTTON_LABEL &&
    surpriseButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === INSTOCK_BUTTON_LABEL &&
    inStockButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === LEADTIME_BUTTON_LABEL &&
    leadTimeButtonStyle({
      ...theme?.device,
      appName: theme?.appName,
      summaryPage: Boolean(summaryPage),
    })}
    ${buttonName === RESET_BUTTON_LABEL &&
    resetButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === HELPER_BUTTON_LABEL &&
    helpButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === CLOSE_BUTTON_LABEL &&
    closeButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === ZOOM_BUTTON_LABEL &&
    zoomButtonStyle({
      ...theme?.device,
      appName: theme?.appName,
      isFullScreen,
    })}
    ${buttonName === INFO_ZOOM_BUTTON_LABEL &&
    infoZoomButtonStyle({ ...theme?.device, appName: theme?.appName })}
    ${buttonName === EDIT_BUTTON_LABEL &&
    editButtonStyle({ ...theme?.device, appName: theme?.appName })}
  `
);

export const LabelBold = styled.span(() => {
  return `
  font-weight: 600;
`;
});

export const ButtonContainerShimmer = styled.div(
  ({
    theme: {
      device: { isMobile },
    },
  }) => {
    return `
    max-width: 33vw;
  ${
    isMobile
      ? `
  border-radius: 30px;
  padding: 18px 36px;
`
      : `
  border-radius: 100px;
  padding: 17px 45px;
`
  }

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
  }
);

export const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
  `;

interface IDot {
  delay: string;
}

export const Dot = styled.div<IDot>(
  ({
    theme: {
      device: { isMobile },
    },
    delay,
  }) => css`
    height: 2px;
    width: 2px;
    margin: 4px 5px;
    background-color: ${isMobile ? COLORS.black : COLORS.white};
    border-radius: 50%;
    animation: ${bounce} 1.5s infinite ease-in-out;
    animation-delay: ${delay};
  `
);

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ButtonWrapper = styled.div`
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

export const LoadingText = styled.span(
  ({
    theme: {
      device: { isMobile },
    },
  }) => css`
    margin-left: 10px;
    font-family: 'LouisVuitton_Regular';
    align-items: flex-end;
    color: ${isMobile ? COLORS.black : COLORS.white};
  `
);
