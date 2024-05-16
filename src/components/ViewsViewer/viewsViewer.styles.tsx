import { DOT_ACTIVE, DOT_INACTIVE } from '../../assets';
import styled from 'styled-components';

export const ViewDotsContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
            display: flex;
            gap: 10px;
            padding-bottom: 10px;
      `;
  }
);

interface IViewDot {
  isActive: boolean;
  isHelper?: boolean;
}

export const ViewDot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isHelper'].includes(prop),
})<IViewDot>(
  ({
    theme: {
      device: { isDesktop },
    },
    isActive,
    isHelper,
  }) => {
    return !isHelper
      ? `
          width: 12px;
          height: 12px;
          object-fit: contain;
          background-image: url(${
            isActive ? `${DOT_ACTIVE}` : `${DOT_INACTIVE}`
          });
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
      ${
        isDesktop
          ? `
          height: 10px;
          width: 10px;
        `
          : ''
      }
  `;
  }
);

export const ArrowContainer = styled.div`
  ${({
    theme: {
      device: { isIpad, isDesktop },
    },
  }) => `
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

export const Arrow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disable'].includes(prop),
})<{ disable: boolean }>`
  width: 48px;
  height: 48px;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props: any) => (props.disable ? '0' : '1')};
  cursor: ${(props: any) => (props.disable ? 'initial' : 'pointer')};

  > img {
    height: 16px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
