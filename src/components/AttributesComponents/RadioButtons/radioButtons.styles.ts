import styled from 'styled-components';

interface RadioButtonWrapperProps {
  showDescription: boolean;
}

export const RadioButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RadioButtonWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})<RadioButtonWrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    showDescription,
  }) => {
    return `
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 100px; 
    transition: border-radius 0.1s ease-in-out;  
    ${
      isMobile && showDescription
        ? 'border-radius: 20px;'
        : isIpad && showDescription
        ? 'border-radius: 20px;'
        : isDesktop && showDescription
        ? 'border-radius: 20px;'
        : ''
    }  `;
  }
);

export const RadioButtonHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const ClickableArea = styled.div.withConfig({
  shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})<RadioButtonWrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    showDescription,
  }) => {
    return `
    cursor: pointer;
    display: flex; 
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;   
    ${
      showDescription && !isMobile
        ? 'padding: 18px 20px 10px 20px;'
        : 'padding: 18px 20px 18px 20px;'
    }   
    transition: padding 0.3s ease-in-out;
    `;
  }
);

export const RadioButton = styled.img`
  width: 15px;
`;

export const RadioButtonLabel = styled.label(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
            font-size: 13px;
            font-family: LouisVuitton_Medium;
            text-transform: uppercase;
            ${
              isMobile
                ? ``
                : isIpad
                ? `
            font-size: 15px;
            `
                : isDesktop
                ? ``
                : ``
            }  
          `;
  }
);

export const DescriptionIconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['showDescription'].includes(prop),
})<RadioButtonWrapperProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    showDescription,
  }) => {
    return `  display: flex;  align-items: center;  justify-content: center;  ${
      showDescription && !isMobile
        ? 'padding: 18px 20px 10px 20px;'
        : 'padding: 18px 20px 18px 20px;'
    } `;
  }
);

export const DescriptionIcon = styled.img`
  margin-left: auto;
  width: 15px;
  cursor: pointer;
`;

export const DescriptionText = styled.p`
  margin: 0;
  overflow: hidden;
  font-size: 17px;
  line-height: 22px;
  font-family: LouisVuitton_Regular;
  font-feature-settings: 'case' on;
  overflow-y: auto;
  font-weight: 400;
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    margin 0.3s ease-in-out;
`;
