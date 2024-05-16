import styled from 'styled-components';
import { NEXT_LABEL, OOB_APPNAME } from '../../../../utils/constants';
interface IHeadingWrapper {
  isActive: string | boolean | null;
}
export const HeadingWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<IHeadingWrapper>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    isActive,
  }) => {
    return `  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 65px;
  ${
    isMobile
      ? isActive === NEXT_LABEL
        ? 'animation: slide-in-right 0.4s ease-in-out forwards;'
        : isActive === 'prev'
        ? 'animation: slide-in-left 0.4s ease-in-out forwards;'
        : 'display: none;'
      : isIpad
      ? `
        padding: 25px 20px;
        border-bottom: 1px solid #E0D7D5;
        `
      : isDesktop
      ? `padding: 25px 20px;
      cursor: pointer;
      ${appName !== OOB_APPNAME ? 'border-bottom: 1px solid #E0D7D5;' : ''}
      `
      : ``
  }
`;
  }
);

export const HeadingTitle = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
  font-size: 15px;
  font-family: LouisVuitton_Demi;
  overflow: hidden;
  width: auto;
  text-overflow: ellipsis;
  padding-right: 20px;
  ${
    isMobile
      ? `
      `
      : isIpad
      ? `
      font-size: 17px;
      `
      : isDesktop && appName === OOB_APPNAME
      ? `text-transform: none;`
      : ''
  }
  
 
  `;
  }
);

export const ColorNameWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 1em;
`;

export const ValueTitle = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
      font-size: 11px;
      font-weight: 400;
      text-transform: capitalize;
  `;
  }
);

export const ChosenColor = styled.img(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
  width: 30px;
  height: 30px;
  border-radius: 5px;

  ${
    isMobile
      ? ''
      : isIpad
      ? `
      `
      : isDesktop && appName === OOB_APPNAME
      ? `
      border-radius: 20px;
     `
      : ''
  }
  `;
  }
);

export const IconStyle = styled.img`
  width: 20px;
  height: 20px;
`;

export const WrapperAtr = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
    display: flex;
    gap: 20px;
    align-items: center;

    ${isMobile ? `` : ``}
    ${isIpad ? `gap: 10px;` : ``}
    ${isDesktop && appName !== OOB_APPNAME ? `gap: 10px;` : ``}
  `;
  }
);

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const TooltipIcon = styled.img`
  width: 20px; /* Set the width as per your icon's size */
  height: 20px; /* Set the height as per your icon's size */
`;

export const TooltipText = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  display: none;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 160px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

export const TooltipContainer = styled.div`
  height: 1em;
  &:hover ${TooltipText}, &:active ${TooltipText} {
    display: block;
    opacity: 0.9;
    z-index: 2000;
  }
`;
