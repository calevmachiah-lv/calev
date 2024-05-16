import styled from 'styled-components';

export const AttributeValuesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  height: -webkit-fill-available;
  align-items: center;
`;

export const AttributeValue = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected', 'inStock', 'img'].includes(prop),
})<{ isSelected: boolean; inStock: boolean; img: string }>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    isSelected,
    inStock,
    img,
  }) => {
    return `
    position: relative;
    background-image: url(${img});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${inStock ? 'transparent' : '#F5F5F5'};
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid ${
      isSelected ? (inStock ? '#000' : '#C53929') : '#E1E1E1'
    };
    flex: 0 0 auto;
    max-height: 90%;
    > img {
      max-width: 100px;
      aspect-ratio: 1 / 1;
      visibility: hidden;
    }
    @media (orientation: landscape) {
      height: fit-content;
      > img {
        max-height: min(90%, 140px);
        aspect-ratio: 1 / 1;
      }
    }
    ${
      !inStock
        ? `&::after {
      content: '';
      width: 10%;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: #c53929;
      position: absolute;
      top: 5px;
      right: 5px;
    }`
        : ''
    }
    `;
  }
);
