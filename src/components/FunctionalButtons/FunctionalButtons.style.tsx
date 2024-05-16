import styled from 'styled-components';

export const Wrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  display: flex;
  gap: 10px;
  min-width: 250px;
  width: ${isMobile ? '100%' : '30%'};
  align-self: flex-start;
  justify-content: flex-end;

  > button {
    @media (orientation: landscape) {
    max-width: 121px;
    }
  }

 ${isMobile
      ? `
      justify-content:center; 
       margin-top:auto;`
      : `max-width: 300px;`
    }  
`
);
