import { styled } from 'styled-components';
import { OOB_APPNAME } from '../../../utils/constants';

export const AccordionContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
    height: 100%;
    overflow-y: scroll;
  
  ${
    isMobile
      ? `
      `
      : isIpad
        ? `
      `
        : isDesktop && appName !== OOB_APPNAME
          ? `width: 100%;
      
     `
          : isDesktop && appName === OOB_APPNAME
            ? `max-width: 600px;`
            : ''
  }   
`;
  }
);

export const FinishButtonContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => `
  background-color: #ffffff;
  padding: 20px;  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  ${
    isMobile ? '' : isIpad ? `` : isDesktop && appName !== OOB_APPNAME ? `` : ''
  }
`
);
