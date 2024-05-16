import { styled } from 'styled-components';

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  width: 100%;
`;

export const Slide = styled.div`
  flex: 1 0 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Heading = styled.h2`
  font-size: 17px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.5vh;
  height: 7.5svh;
  border-top: 1px solid #e6e6e6;
`;

export const ButtonImg = styled.img`
  width: 26px;
`;

export const NavigationButton = styled.button`
  background-color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
`;

export const FinishButton = styled(NavigationButton)`
  color: #000000;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const PreviousButton = styled(NavigationButton)`
  border-right: 1px solid #e6e6e6;
`;
