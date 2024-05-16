import styled, { css } from 'styled-components';
import { OOB_APPNAME } from '../../utils/constants';

interface LoaderContainerProps {
  theme: {
    device: {
      isMobile: boolean;
    };
  };
  currentMode: string;
  playerSize: {
    height: number;
    width: number;
  };
}

export const LoaderContainer = styled.div
  .attrs<LoaderContainerProps>((props) => ({}))
  .withConfig({
    shouldForwardProp: (prop: string) =>
      !['currentMode', 'playerSize'].includes(prop),
  })<LoaderContainerProps>`
  ${({
    theme: {
      device: { isMobile },
    },
    currentMode,
    playerSize: { height, width },
  }) => css`
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

export const LoaderContainerItem = styled.div`
  ${({ theme }) => css`
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
    theme.appName === OOB_APPNAME &&
    css`
      border: 1px solid transparent;
      border-radius: 100px;
    `}

    img {
      max-width: 100%;
      max-height: 100%;
    }
  `}
`;
