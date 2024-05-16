import styled from 'styled-components';

export const Wrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  display:flex;
  flex-direction:column;
  gap: 10px;
  min-width: 250px;
  width:  '100%' ;
`
);
