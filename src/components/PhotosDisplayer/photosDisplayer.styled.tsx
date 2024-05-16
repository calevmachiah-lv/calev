import styled from 'styled-components';
import { OOB_APPNAME } from '../../utils/constants';

interface Device {
  isMobile: boolean;
  isIpad: boolean;
  isDesktop: boolean;
}

interface Theme {
  device: Device;
  appName: string;
}

interface WrapperProps {
  theme: Theme;
  width?: string; // Assuming width is a string, adjust if necessary
}

interface PlayerWrapperProps extends WrapperProps {
  playerSelected: boolean;
}

interface MainPhotoProps extends WrapperProps {
  hidePhoto: boolean;
  image: string;
}

interface ElsePhotoWrapperProps extends WrapperProps {
  selected: boolean;
}

export const Wrapper = styled.div<WrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  display: flex;
  flex-direction: column;
  width: 100vw;
  ${isMobile
      ? ''
      : isIpad
        ? 'border-right: 1px solid #e0d7d5; width: 50vw;'
        : isDesktop
          ? 'border-right: 1px solid #e0d7d5; width: 50vw;'
          : ''
    }
`
);

export const MainPhotoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const PlayerWrapper = styled.div<PlayerWrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    playerSelected,
  }) => `
  opacity: ${!playerSelected ? 0 : 1};
  z-index: ${!playerSelected ? -10 : 0};
  position: ${!playerSelected ? 'absolute' : 'relative'};
  height: 45vh;
  height: 45svh;
  transition: opacity 0.3s ease-in-out;
  ${isMobile ? '' : isIpad ? 'height: 100%;' : isDesktop ? 'height: 100%;' : ''}
  `
);

export const MainPhoto = styled.div<MainPhotoProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    hidePhoto,
    image,
  }) => `
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
`
);

export const ElsePhotosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e0d7d5;
  border-bottom: 1px solid #e0d7d5;
`;

export const ElsePhotoWrapper = styled.div<ElsePhotoWrapperProps>(
  ({ theme: { appName }, width, selected }) => `
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
  `
);

export const ElsePhoto = styled.div<{ imageToDisplay: string }>(
  ({ imageToDisplay }) => `
  width: 100%;
  object-fit: contain;
  background-image: url('${imageToDisplay}');
  background-color: #efefef;
  background-position: center;
  background-size: cover;
  `
);

export const Icon360 = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
`;
