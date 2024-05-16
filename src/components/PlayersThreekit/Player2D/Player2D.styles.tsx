import styled, { css } from 'styled-components';
import {
  TK_PLAYER_DIV_ID_2D,
  TK_PLAYER_DIV_ID_3D,
} from '../../../utils/constants';

interface DeviceInfo {
  isMobile: boolean;
  isIpad: boolean;
  isDesktop: boolean;
}

interface Theme {
  device: DeviceInfo;
  appName: string;
}

interface PictureProps {
  theme: Theme;
  slideDirection: string | undefined;
}
interface StepPicture {
  theme: Theme;
  slideDirection: string | undefined;
}

interface WrapperProps {
  height?: string;
  maxHeight?: string;
  width?: string;
  border?: string;
  isRotable?: boolean;
  conditionalCSS?: boolean;
  displayTutorial?: boolean;
  fullScreen: boolean;
}

export const Wrapper = styled.div
  .attrs<WrapperProps>(
    ({ theme, isRotable, conditionalCSS, displayTutorial, height }) => ({
      style: {
        cursor: isRotable ? 'grab' : 'default',
        borderRight: theme.device.isMobile ? 'none' : '1px solid #ccc',
        height: height ? height : theme.device.isMobile ? '' : '100vh',
        maxHeight: height ? height : theme.device.isMobile ? '' : '100vh',
        flex: !theme.device.isMobile ? '2 0' : '2 0',
      },
    })
  )
  .withConfig({
    shouldForwardProp: (prop) =>
      ![
        'isRotable',
        'conditionalCSS',
        'fullScreen',
        'displayTutorial',
      ].includes(prop),
  })<WrapperProps>(
  ({ fullScreen, displayTutorial }) => `
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

  #${TK_PLAYER_DIV_ID_2D}, #${TK_PLAYER_DIV_ID_3D} {
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
`
);

export const Picture = styled.img
  .attrs<PictureProps>((props) => ({}))
  .withConfig({
    shouldForwardProp: (prop) => !['slideDirection'].includes(prop),
  })`
  ${({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    slideDirection,
  }) => `
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
      ${
        isMobile
          ? css`
              width: 70%;
            `
          : css`
              width: 50%;
            `
      }
    }
  `}
`;

export const StepPicture = styled.img
  .attrs<StepPicture>((props) => ({}))
  .withConfig({
    shouldForwardProp: (prop) => !['slideDirection'].includes(prop),
  })`
  ${({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    slideDirection,
  }) => `
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
    animation: ${
      slideDirection === 'next' ? 'slideInFromRight' : 'slideInFromLeft'
    } 0.5s forwards;

    @media (min-width: 767px){
      ${
        isMobile
          ? css`
              width: 70%;
            `
          : css`
              width: 50%;
            `
      }
    }

  `}
`;
