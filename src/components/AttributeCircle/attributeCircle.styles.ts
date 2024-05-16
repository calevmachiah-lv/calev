import styled, { css } from 'styled-components';

export const AttributeCircleContainer = styled.div.withConfig({
  shouldForwardProp: (props) => !['isActive'].includes(props),
})<{ isActive: boolean }>`
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

export const CircleContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['inStock', 'img', 'isSelected', 'isTutorialCurrentStep'].includes(prop),
})<{
  inStock: boolean;
  img: any;
  isSelected: boolean;
  isTutorialCurrentStep: boolean;
}>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    inStock,
    img,
    isSelected,
    isTutorialCurrentStep,
  }) => {
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

  ${
    isTutorialCurrentStep
      ? css`
          background-image: url('');
          background-color: transparent;
          border-color: #ffffff;
          z-index: 9999999;
          border-style: double;
          border-width: 6px;
        `
      : ''
  }
  
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
  }
);

export const CircleImage = styled.div`
  border-radius: 50%;
  border: none;
  width: 90%;
  height: 90%;
`;

export const Image = styled.img`
  visibility: hidden;
  width: 100%;
  @media (orientation: landscape) {
    width: 40px;
    height: 40px;
  }
`;

export const AttributeName = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isTutorialCurrentStep'].includes(prop),
})<{ isTutorialCurrentStep: boolean; isActive: boolean }>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    isTutorialCurrentStep,
    isActive,
  }) => {
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
  }
);
