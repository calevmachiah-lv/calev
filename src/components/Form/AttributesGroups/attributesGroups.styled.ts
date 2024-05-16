import styled from 'styled-components';

export const GroupsWrapper = styled.div(
  ({
    theme: {
      device: { isMobile },
    },
  }) => {
    return `
      ${isMobile ? 'height: 100%;' : ''}
      `;
  }
);

interface IGroupWrapper {
  isActive: boolean;
}

export const GroupWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<IGroupWrapper>`
  display: flex;
  flex-direction: column;
  ${({ theme, isActive }) => {
    const { isMobile, isIpad, isDesktop } = theme.device;
    return `
      ${isActive && 'height: 100%;'}
      ${
        isMobile
          ? ''
          : isIpad
            ? 'height: unset; gap: 0;'
            : isDesktop
              ? 'height: unset; gap: 0;'
              : ''
      }`;
  }}
`;

export const ProgressBarWrapper = styled.div`
  height: fit-content;
  padding-bottom: 15px;
`;
