import { css, styled } from 'styled-components';
import { OOB_APPNAME } from '../../utils/constants';

export const ProductInfosContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          display: absolute;
          top: 0;
          width: 100%;
          background-color: #fff;  
          font-size: 20px;
          font-weight: bold;
          padding: 10px;
          height: 100px;
     
          ${isMobile ? ' ' : isIpad ? ' ' : isDesktop ? ' ' : ''}
            `;
  }
);

export const CopyImg = styled.img`
  transform: translate(0%, 20%);
  cursor: pointer;
`;

export const Wrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          
          display: flex;
          flex-direction: row;
          max-height: 16px;
          gap: 20px;
          justify-content:space-between;
          width:100%;
          align-items:center;
          
          ${isMobile ? '' : isIpad ? '' : isDesktop ? '  ' : ''}
            `;
  }
);

export const InnerContainer = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          
          display: flex;
          flex-direction: column;
          gap:4px;
          justify-content: space-between;
          width:100%;
        
          
          
          
          ${isMobile ? '' : isIpad ? '' : isDesktop ? '' : ''}
            `;
  }
);

export const ShareAndWish = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `  
                display: flex;
                flex-direction: row;
                align-items: center;
                gap:10px;
      
          ${isMobile ? '' : isIpad ? `` : isDesktop ? ` ` : ''}
            `;
  }
);
export const ShareAndWishImage = styled.img(
  () => {
    return `  
              width:15px;
              height:14px;
              cursor:pointer;
      
         
            `
  }
);
export const InnerWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          
          display: flex;
          flex-direction: row;
          gap: 3px;      
          
          ${isMobile ? '' : isIpad ? '' : isDesktop ? '  ' : ''}
            `;
  }
);

export const Section = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
          ${isMobile
        ? ` `
        : isIpad
          ? 'border: none;'
          : isDesktop
            ? 'border: none;'
            : ''
      }
            `;
  }
);

export const TopSection = styled(Section)(({
  theme: {
    device: { isMobile, isIpad, isDesktop },
  },
}) => {
  return `
          display: flex;          
          
          justify-content: space-between;
          ${isMobile
      ? 'flex-wrap: wrap; '
      : isIpad
        ? ` border-bottom: 1px solid #EBEBF0;
                    padding :15px; 
                    `
        : isDesktop
          ? ` 
                   padding :15px; 
                `
          : ''
    }
            `;
});

export const ProductSKU = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
  }) => {
    return `
          font-size: 10px;
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1.4rem;       
          font-feature-settings: 'case' on;
          ${isDesktop && appName === OOB_APPNAME
        ? `
              font-size: 12px;
              font-weight: 500;
              line-height: 15px;
              font-family: LouisVuitton_Medium;
          `
        : ''
      }
      `;
  }
);

export const RecipeId = styled.div(
  () => `
          font-size: 13px;
          margin-left:10px;
          font-weight: 500;
          line-height: 1.4rem;
      `
);

export const ShareButton = styled.img(
  () => `
          width: 25px;      
      `
);

export const CopyButton = styled.img(
  () => `
          width: 25px;
      `
);

export const ProductPrice = styled.div(
  () => `
          font-size: 17px;
          font-weight: 500;
          line-height: 1.6rem;
          padding-top: 10px;
          font-family: LouisVuitton_Medium;

      `
);

export const ProductLeadTime = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
  
      padding: 6px 13px;
      border-radius: 35px;
      background-color: #F5F5F3;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      width: auto;
      height: 40px;
      >span {
          font-weight: 600;
      }
          ${isMobile ? `height: 33px;` : isIpad ? `` : isDesktop ? `` : ``}
            `;
  }
);

export const ProductImg = styled.img(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => {
    return `
  
          width: 100%;
          
          object-fit: contain;
  
     
          ${isMobile
        ? ' height: 50%; '
        : isIpad
          ? ' width: 50%; border-right: 1px solid #EBEBF0;'
          : isDesktop
            ? '  width: 50%;  border-right: 1px solid #EBEBF0;'
            : ''
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
          width: 100%;
          font-size: 16px;
          line-height:24px;
          text-transform: capitalize;
          font-family: 'LouisVuitton_Regular';
          font-weight: 400;
         
      `;
  }
);

interface ContainerProps {
  clientPage?: any;
}

export const Container = styled(Section).withConfig({
  shouldForwardProp: (prop) => !['clientPage'].includes(prop),
})<ContainerProps>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    clientPage,
  }) => {
    return `
        display: flex;
        justify-content: space-between;
        align-items:start;
        width:100%;
        gap:8px;


        ${isMobile
        ? `flex-wrap: wrap;
              ${clientPage ? 'padding: 20px 10px !important;' : ''}`
        : isIpad
          ? `
                padding: 30px 20px 20px 20px;
                `
          : isDesktop
            ? `
                 padding: 30px 20px 20px 20px;
              `
            : ''
      }

      ${appName === OOB_APPNAME &&
      css`
          border-bottom: none;
        `
      }

        ${appName === OOB_APPNAME && isDesktop && clientPage
        ? `
            padding-top: 0;
            `
        : ''
      }
          `;
  }
);
