import styled, { css } from 'styled-components';

export const BackgroundWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['show'].includes(prop),
}) <{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ show }) =>
    show ? 'rgba(0, 0, 0, 0.52)' : 'transparent'};
  z-index: ${({ show }) => (show ? 99 : -1)};
  transition: ${({ show }) => (show ? 'all 0.7s ease' : 'all 0.2s ease')};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px 0;
  height: 25vh;
  height: 25svh;
  border-radius: 24px 24px 0 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const TopFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 50%;
  padding: 0 25px;
`;

export const BottomFormContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const TitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectionSummaryIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const BesideAttributesContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 250px;
  width: 30%;
  max-width: 300px;
`;

interface IValuesContainer {
  theme: {
    device: { isMobile: boolean; isIpad: boolean; isDesktop: boolean };
  };
}
export const ValuesContainer = styled.div<IValuesContainer>(
  ({
    theme: {
      device: { isMobile },
    },
  }) => css`
    position: absolute;
    max-width: 100%;
    height: 100%;
    padding: 0 25px;
    transition: all 0.5s ease-in-out;
    ${!isMobile &&
    css`
      display: flex;
      overflow-x: auto;
      gap: 20px;
      height: -webkit-fill-available;
      align-items: center;
    `}
  `
);