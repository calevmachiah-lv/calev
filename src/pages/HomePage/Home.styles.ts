import { OOB_APPNAME } from '../../utils/constants';
import { styled } from 'styled-components';

interface ContainerProps {
  overscroll: boolean;
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['divHeight', 'overscroll'].includes(prop),
})<ContainerProps>(
  ({
    theme: {
      device: { isMobile },
    },
    overscroll,
  }) => {
    return `
      display: flex;
      flex-direction: column;
      color: black;
      overflow: ${overscroll ? 'hidden' : 'scroll'};
      height: 100vh;
      ${!isMobile
        ? `
            flex-direction: column;
            & > * {
              flex: 1;              
            }
            `
        : ''
      } 
    `;
  }
);

export const ProductInfosContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: transparent;
        height: min-content;
        
        ${isMobile
        ? ``
        : `        
          position: fixed;
          top: 5vmin;
          left: 5vmin;
        `
      }
`;
  }
);

export const ProductName = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
        font-size: 18px;
        font-family: LouisVuitton_Regular;
        flex-wrap:wrap;
        word-wrap: break-word;
        ${isMobile
        ? ''
        : isIpad
          ? ''
          : isDesktop
            ? ''
            : ''
      }
        `;
  }
);

export const ProductPrice = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
        z-index: 1000;
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        font-family: LouisVuitton_Medium;
        color: #A6A6A6;
        ${isMobile
        ? ''
        : isIpad
          ? 'font-size: 15px; color: #000;'
          : isDesktop
            ? 'font-size: 15px; color: #000;'
            : ''
      }

    `;
  }
);

export const ProductPriceShimmer = styled.div(() => {
  return `
  z-index: 1000;
  height: 20px;
  width: 60px;
  //padding: 8px 30px;
  border-radius: 100px;

  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  animation: shimmer 20s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: -80vw 0;
    }
    100% {
      background-position: 80vw 0;
    }
  }
`;
});

export const InnerContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => `
    ${(isIpad || isDesktop) &&
    `
        display: flex;
        flex-direction: column;
        border-right: none;
        border-bottom: none;
        border-top: 0px;
        height: 100vh;
        height: 100svh;
        overflow-y: auto;
        min-width: 350px;
        width: 33vw;
      `
    }

    ${isDesktop &&
    appName === OOB_APPNAME &&
    `
        align-items: center;
        border: none;
        width: 50vw;
      `
    }
  `
);

export const ProductAndAboveContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
    ${(isIpad || isDesktop) &&
      `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px 20px 20px 20px;
        border-bottom: 1px solid #E0D7D5;
        min-height: 140px;
    `
      }
    ${isDesktop && appName === OOB_APPNAME ? 'border: none;' : ''}
    `;
  }
);

export const Reset = styled.div`
  margin-top: auto;
  margin-bottom: 17px;
`;

export const ProductNameAndReset = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const WrapperContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
    overflow: hidden;
     
     ${isMobile
        ? ' '
        : isDesktop && appName !== OOB_APPNAME
          ? `  width: 100%;          
           `
          : isDesktop && appName === OOB_APPNAME
            ? `max-width: 600px;
            width :100%;
             
             
           `
            : ''
      }
    `;
  }
);

export const AboveFormContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 10px 0;
        align-items: center;
        height: 70px;
        ${isMobile
        ? 'display: grid; grid-template-columns: 1fr auto 1fr'
        : isIpad
          ? 'padding: 0; gap:5px; height: auto;'
          : isDesktop
            ? 'padding: 0; gap:5px; height: auto;'
            : ''
      }

    `;
  }
);
