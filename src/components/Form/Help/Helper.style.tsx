import { css, styled } from 'styled-components';

interface DeviceInfo {
  isMobile: boolean;
  isIpad: boolean;
  isDesktop: boolean;
}

interface Theme {
  device: DeviceInfo;
  appName: string;
}

interface StepSlideProps {
  theme: Theme;
  isActive: boolean;
}

export const Section = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          ${
            isMobile
              ? `align-items: center;
              `
              : isIpad
              ? 'border: none;'
              : isDesktop
              ? 'border: none;'
              : ''
          }
            `;
  }
);
export const Container = styled(Section).withConfig({
  shouldForwardProp: (prop) => !['clientPage'].includes(prop),
})<{ open: boolean }>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    open,
  }) => {
    return `
        transform-origin: 0 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        z-index: 99999;
        height: 100vh;
        overflow: hidden;
        transition: transform 0.5s;
        transform: ${open ? 'scaleY(1);' : 'scaleY(0);'}

        `;
  }
);

export const InnerContainer = styled.div<{ open: boolean }>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
    open,
  }) => {
    return `
    position: absolute;
    background-color: #FFFFFF;
    width: ${isMobile ? '100%;' : '50%;'}
    z-index: 99999;
    height: 95vh;
    bottom: 0;
    overflow: hidden;
    border-radius:20px 20px 0px 0px ;
    padding : 24px 24px 24px 24px;
    transition: all 0.3s ease-out;
    ${!isMobile ? 'transform: translate(-50%, 0%); left : 50%' : ''}
    `;
  }
);

export const Title = styled.label(() => {
  return `
    font-size: 18px;
    color: #000000;
    font-family: LouisVuitton_Medium;


    `;
});

export const TitleContainer = styled.div(() => {
  return `
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    `;
});
export const Icon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const ContentContainer = styled.div(() => {
  return `
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height:100%
    `;
});

export const PictureContainer = styled.div
  .attrs<{
    image: string;
    slideDirection: string;
  }>((props) => ({}))
  .withConfig({
    shouldForwardProp: (prop) => !['image', 'slideDirection'].includes(prop),
  })`
  ${({ image, slideDirection }) => `
    position:relative ;
    flex: 2;
    width: 100% ;
    background-color: #EFEFEF;
    background-image: url(${image});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
     @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
      }

      @keyframes slideInFromLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
      }
    animation: ${
      slideDirection === 'next' ? 'slideInFromRight' : 'slideInFromLeft'
    } 0.5s forwards;
    `}
`;

export const DescriptionContainer = styled.div(() => {
  return `
    margin-top: 20px;
    display:flex;
    flex-direction:column;
    flex: 1;
    width:100%;
    @keyframes opacityAnimation {
      from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
    }
  animation: opacityAnimation 0.5s forwards;
    `;
});

export const StepTitle = styled.label(() => {
  return `
       font-size: 10px;
       line-height: 16px;
       font-family: LouisVuitton_Regular;

    `;
});

export const DescriptionTitle = styled.label(() => {
  return `
         font-size: 18px;
         line-height: 24px;
         font-family: LouisVuitton_Demi;
         color:#000000;
  
      `;
});

export const DescriptionText = styled.text(() => {
  return `
    padding-top :10px;
    font-size: 16px    ;
    line-height: 24px;
    font-family: LouisVuitton_Regular;
    color:#000000;
    `;
});
export const StepSlide = styled.div
  .attrs<StepSlideProps>((props) => ({}))
  .withConfig({
    shouldForwardProp: (prop) => !['isActive'].includes(prop),
  })`
  ${({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    isActive,
  }) => `
  display: ${isActive ? '' : 'none'};
  `}
`;
