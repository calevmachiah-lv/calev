import styled from 'styled-components';
import { PORTRAIT_FORM_BASE_HEIGHT_IN_PX } from '../../utils/constants';

export const ActiveAttributeSelectorContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;
  padding: 20px 25px;
  height: ${PORTRAIT_FORM_BASE_HEIGHT_IN_PX}px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  -webkit-transition: bottom 0.3s ease-in-out;
  -moz-transition: bottom 0.3s ease-in-out;
  -ms-transition: bottom 0.3s ease-in-out;
  transition: bottom 0.3s ease-in-out;
`;

export const CloseIcon = styled.img`
  width: 1rem;
  position: absolute;
  right: 1rem;
`;

export const CloseButton = styled.button`
  background-color: #000;
  color: #fff;
  width: 100%;
  min-height: 48px;
  border: none;
  margin-top: auto;
  border-radius: 24px;
  &:active {
    background-color: #4d4d4d;
    color: #000;
  }
`;

export const ValuesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin: 20px 0;
`;
