import styled, { css } from 'styled-components';
import {
  BIG_SIZE_LABEL,
  OOB_APPNAME,
  SMALL_SIZE_LABEL,
  VERTICAL_SIZE_LABEL,
} from '../../../utils/constants';

interface ItemsWrapperProps {
  size: string;
  insideOptionalGroup: boolean;
  isActiveFilter?: boolean;
}

export const ItemsWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['insideOptionalGroup', 'isActiveFilter', 'isPatch'].includes(prop),
})<ItemsWrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    size,
    insideOptionalGroup,
    isActiveFilter,
  }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    width: 100%;

    @keyframes reverseSlideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    ${isActiveFilter &&
    css`
      animation: reverseSlideIn 0.3s ease-in;
    `}

    @media (min-width: 1024px) {
      gap: 8px 4px;
      ${size === 'VERTICAL_SIZE_LABEL' &&
    css`
        gap: 10px;
        flex-wrap: wrap;
      `}
    }

    ${isMobile &&
    css`
      gap: 12px 8px;
    `}

    ${isIpad &&
    css`
      gap: 8px 4px;
      ${appName !== OOB_APPNAME &&
      css`
        ${size === SMALL_SIZE_LABEL &&
        css`
          ${insideOptionalGroup &&
          css`
            width: 350px;
          `}
        `}
      `}
    `}

    ${isDesktop &&
    css`
      gap: 8px 4px;
      ${appName !== OOB_APPNAME &&
      css`
        ${size === SMALL_SIZE_LABEL &&
        css`
          ${insideOptionalGroup &&
          css`
            width: 350px;
          `}
        `}
      `}
    `}

    ${appName === OOB_APPNAME &&
    css`
      gap: 25px 12px;
      ${size === SMALL_SIZE_LABEL &&
      css`
        ${insideOptionalGroup &&
        css`
          width: 350px;
        `}
      `}
      ${size === BIG_SIZE_LABEL &&
      css`
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      `}
    `}
  `
);

export const ItemWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => css`
    cursor: pointer;
    position: relative;
    overflow: hidden;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    max-width: 150px;
    text-overflow: ellipsis;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;

    ${appName === OOB_APPNAME &&
    css`
      align-items: center;
      text-align: center;
      gap: 10px;
    `}
  `
);

interface ContainerProps {
  size: string;
  selected: boolean;
}

interface NoImageProps {
  size: string;
  selected: boolean;
  isImage: boolean;
}

export const ContainerStyle = styled.div<ContainerProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    size,
    selected,
  }) => css`
    width: 100%;
    border-radius: 5px;
    aspect-ratio: 16 / 9;
    border: 1px solid #000;

    ${size === VERTICAL_SIZE_LABEL &&
    css`
      aspect-ratio: 4 / 5;
    `}

    ${!selected &&
    css`
      border: 1px solid transparent;
    `}


    ${appName === OOB_APPNAME &&
    css`
      border-radius: 50%;
      width: 80%;
      aspect-ratio: 1 / 1;
      ${size === SMALL_SIZE_LABEL &&
      `${isMobile
        ? css`
              width: 50%;
            `
        : css`
              width: 40%;
            `
      }`}
    `}
  `
);

interface ItemImgProps {
  isToneOnTone: boolean;
  selected: boolean;
  backgroundImageKind?: boolean;
  backgroudToDisplay: string;
}

export const ItemImg = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['backgroundImageKind', 'backgroudToDisplay', 'isToneOnTone'].includes(
      prop
    ),
})<ItemImgProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    isToneOnTone,
    selected,
    backgroundImageKind,
    backgroudToDisplay,
  }) => css`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    justify-self: flex-start;
    background-repeat: no-repeat;
    background-position: center;

    ${backgroundImageKind
      ? css`
          background-image: url('${backgroudToDisplay}');
        `
      : css`
          background-color: ${backgroudToDisplay};
        `}

    ${isToneOnTone
      ? css`
          background-size: contain;
        `
      : css`
          background-size: cover;
        `}

      ${selected &&
    css`
      border: 2px solid #fff;
    `}

    
   ${appName === OOB_APPNAME &&
    css`
      border-radius: 50%;
    `}
  `
);

export const ItemNoImg = styled.div<NoImageProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    size,
    selected,
    isImage
  }) => css`
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f7f6f4;
    aspect-ratio: 16 / 9;
    width: 50%;

    ${selected
      ? css`
          border: 1px solid #000;
        `
      : css``}

    ${isMobile &&
    css`
      ${appName !== OOB_APPNAME &&
      css`
        justify-self: flex-start;
        width: 100%;

        ${size === SMALL_SIZE_LABEL && (selected ? css`` : css``)}

        ${size === BIG_SIZE_LABEL && (selected ? css`` : css``)}

        ${size === VERTICAL_SIZE_LABEL &&
        (selected
          ? css`
              aspect-ratio: 4 / 5;
            `
          : css`
              aspect-ratio: 4 / 5;
            `)}
      `}
    `}

    ${isIpad &&
    css`
      ${appName !== OOB_APPNAME &&
      css`
        width: 100%;

        ${selected && css``}

        ${size === SMALL_SIZE_LABEL && (selected ? css`` : css``)}

        ${size === BIG_SIZE_LABEL && (selected ? css`` : css``)}

        ${size === VERTICAL_SIZE_LABEL &&
        css`
          aspect-ratio: 4 / 5;
        `}
      `}
    `}

    ${isDesktop &&
    css`
      ${appName !== OOB_APPNAME &&
      css`
        width: 100%;
      `}
      ${size === VERTICAL_SIZE_LABEL &&
      css`
        aspect-ratio: 4 / 5;
      `}
    `}

    ${isDesktop &&
    css`
      ${appName === OOB_APPNAME &&
      css`
        ${size === SMALL_SIZE_LABEL &&
        css`
          max-height: 55px;
        `}
        ${size === BIG_SIZE_LABEL && isImage &&
        css`
          width: 80%;
          text-transform: uppercase;
          font-size: 24px;
          line-height: 1;
          `}
        aspect-ratio: 1 / 1;
        border-radius: 50%;
      `}
    `}
  `
);

export const ItemNameWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => css`
    display: flex;
    gap: 5px;
    align-items: start;
    width: 100%;
  `
);

export const ItemName = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => css`
    font-size: 11px;
    font-weight: 400;
    text-transform: capitalize;
    color: #000;
    flex-wrap: nowrap;
    width: 100%;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
);

export const FiltersComponentWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `
);

export const FiltersWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => css`
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
  `
);

export const FiltersTitlesWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => css`
    display: flex;
    gap: 15px;
    overflow-x: auto;
    margin: 5px 0 15px;

    ${isDesktop &&
    appName === OOB_APPNAME &&
    css`
      margin-bottom: 30px;
      width: fit-content;
      border-bottom: 1px solid #f7f6f4;
    `}
  `
);

interface FilterTitleProps {
  isActive: boolean;
}

export const FilterTitle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<FilterTitleProps>(
  ({
    theme: {
      device: { isDesktop },
      appName,
    },
    isActive,
  }) => css`
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    color: ${isActive ? css`#000` : css`rgba(0, 0, 0, 0.20)`};
    text-transform: uppercase;

    ${isDesktop &&
    appName === OOB_APPNAME &&
    css`
      height: 25px;

      ${isActive &&
      css`
        border-bottom: 1px solid #000;
        transition: border-bottom 0.5s ease-in-out;
      `}
    `}
  `
);

export const DescriptionIconWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

export const DescriptionIcon = styled.img`
  width: 15px;
  cursor: pointer;
`;
