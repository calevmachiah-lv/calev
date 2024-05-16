import styled from 'styled-components';

export const SelectedValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  white-space: pre;
`;

export const SelectedValue = styled.div.withConfig({
  shouldForwardProp: (prop) => !['inStock'].includes(prop),
})<{ inStock: boolean }>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    inStock,
  }) => {
    return `
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 2rem;
  color: ${inStock ? '#767676' : '#C53929'};
  text-wrap: nowrap;
  ${
    !inStock
      ? `&::before {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #C53929;
        margin-right: 0.2rem;
  }`
      : ''
  }
`;
  }
);
