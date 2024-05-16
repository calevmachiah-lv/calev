import { styled } from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  z-index: 10;
  flex: 1;
`;

export const Slide = styled.div`
  padding: 0 20px;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  border-top: 1px solid #e6e6e6;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  gap:15px;
`;

export const ButtonImg = styled.img`
  width: 26px;
`;

interface IButtonProps {
  disabled: boolean;
}

export const NextButton = styled.button<IButtonProps>(
  ({ disabled = false }) => {
    return `
  background-color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 50%;
  &:first-child {
    border-right: 1px solid #e6e6e6;
  }
  ${
    disabled
      ? `
      cursor: default;
      pointer-events: none;
      /* NOTE: opacity only for the icon inside the button. */
      > * {
        opacity: 0.5;
      }
    `
      : ``
  }
`;
  }
);

export const FinishButton = styled(NextButton)`
  color: #000000;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const PreviousButton = styled(NextButton)``;
