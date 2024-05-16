import styled, { css } from 'styled-components';
import { OOB_APPNAME } from '../../../utils/constants';

interface ITextSummary {
  theme: {
    device: { isMobile: boolean; isIpad: boolean; isDesktop: boolean };
    appName: string;
  };
  page: string;
  isPatchAttribute?: boolean;
}

export const AttributeValue = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isPatchAttribute', 'page'].includes(prop),
})<ITextSummary>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    page,
    isPatchAttribute,
  }) => {
    return page === 'summary'
      ? css`
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;

          ${isPatchAttribute &&
        css`
            min-width: 70px;
            padding: ${isMobile ? '6px 13px' : '8px 13px'};
            border: 1px solid #e0d7d5;
            border-radius: 5px;
          `}

          ${isMobile
          ? ' '
          : isIpad
            ? 'flex-direction: row-reverse;'
            : isDesktop
              ? 'flex-direction: row-reverse;'
              : ''}

          ${appName === OOB_APPNAME && isDesktop
          ? `
              text-transform: capitalize;
            `
          : ''}
        `
      : css`
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          text-transform: capitalize;

          ${appName === OOB_APPNAME && isDesktop
          ? `
              flex-direction: column;
              width: 100px;
              text-align: center;
            `
          : ''}
        `;
  }
);

export const TextSummary = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isPatchAttribute', 'page', 'uppercase'].includes(prop),
})<ITextSummary>(({ page, isPatchAttribute = false }) => {
  return page === 'summary'
    ? css`
        border-radius: 5px;
        font-size: 13px;
        font-weight: 500;
        text-transform: ${!isPatchAttribute ? 'capitalize' : 'none'};

        ${isPatchAttribute &&
      css`
          margin: auto;
        `}
      `
    : '';
});

export const ComponentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['page'].includes(prop),
})<ITextSummary>(
  ({
    theme: {
      device: { isMobile },
    },
    page,
  }) => {
    return page === 'summary'
      ? css`
          display: flex;
          flex-direction: ${isMobile ? '' : 'row-reverse'};
          gap: 15px;
          justify-content: center;
          align-items: center;
        `
      : '';
  }
);

interface IAttributeThumbnail {
  theme: {
    device: { isMobile: boolean; isIpad: boolean; isDesktop: boolean };
    appName: string;
  };
  src?: string;
  page: string;
}

export const AttributeThumbnail = styled.img<IAttributeThumbnail>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    src,
    page,
  }) => {
    return page === 'summary'
      ? `
          width: 26px;
          height: 26px;
          border-radius: 5px;

          ${isMobile
        ? ''
        : isIpad
          ? 'width: 35px; height: 35px;'
          : isDesktop
            ? 'width: 35px; height: 35px;'
            : ''
      }

          ${appName === OOB_APPNAME && isDesktop
        ? `
              width: 26px;
              height: 26px;
              border-radius: 50%;
            `
        : ''
      }
        `
      : `
          background-image: url('${src}');
          width: 30px;
          height: 30px;
          border-radius: 5px;

          ${isMobile
        ? ''
        : isIpad
          ? 'width: 35px; height: 35px;'
          : isDesktop
            ? 'width: 35px; height: 35px;'
            : ''
      }

          ${appName === OOB_APPNAME && isDesktop
        ? `
              width: 25px;
              height: 25px;
              border-radius: 50%;
            `
        : ''
      }
        `;
  }
);

export const AttributeWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['page'].includes(prop),
})<ITextSummary>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    page,
  }) => {
    return page === 'summary'
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;

          ${isMobile
          ? 'flex-basis: 48%; padding-bottom: 30px; gap: 15px;'
          : isIpad
            ? 'flex-direction: row; justify-content: space-between; padding: 20px; border-bottom: 1px solid #E0D7D5; align-items: center; height: 65px;;'
            : isDesktop
              ? 'flex-direction: row; justify-content: space-between; padding: 20px; border-bottom: 1px solid #E0D7D5; align-items: center; height: 65px;;'
              : ''}

          ${appName === OOB_APPNAME && isDesktop
          ? `
              border-bottom: none;
              padding: 25px 20px;
            `
          : ''}
        `
      : css`
          display: flex;
          gap: 15px;
          justify-content: space-between;
          align-items: center;

          ${isMobile
          ? ''
          : isIpad
            ? 'border-bottom: 1px solid #E0D7D5; padding: 20px;'
            : isDesktop
              ? 'border-bottom: 1px solid #E0D7D5; padding: 20px;'
              : ''}

          ${appName === OOB_APPNAME && isDesktop
          ? `
              padding: 25px 20px;
              border: none;
            `
          : ''}
        `;
  }
);

export const AttributeLabel = styled.div.withConfig({
  shouldForwardProp: (prop) => !['page'].includes(prop),
})<ITextSummary>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    page,
  }) =>
    page === 'summary'
      ? css`
          font-size: 15px;
          font-weight: 600;
          text-wrap: balance;

          ${appName === OOB_APPNAME && isDesktop
          ? `
              text-transform: capitalize;
            `
          : ''}
        `
      : css`
          font-size: 15px;
          font-weight: 600;
          text-transform: capitalize;

          ${isMobile
          ? ''
          : isIpad
            ? 'font-size: 17px; font-weight: 600;'
            : isDesktop
              ? 'font-size: 17px; font-weight: 600;'
              : ''}
        `
);

interface IBackgroundColor {
  theme: {
    device: { isMobile: boolean; isIpad: boolean; isDesktop: boolean };
    appName: string;
  };
  backgroundColor?: string;
}

export const BackgroundColor = styled.div<IBackgroundColor>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    backgroundColor,
  }) => `
    display: flex;
    flex-direction: column;
    background-color: ${backgroundColor};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 26px;
    height: 26px;
    border-radius: 5px;

    ${isMobile
      ? ''
      : isIpad
        ? 'width: 35px; height: 35px;'
        : isDesktop
          ? 'width: 35px; height: 35px;'
          : ''
    }

    ${appName === OOB_APPNAME && isDesktop
      ? `
        width: 26px;
        height: 26px;
        border-radius: 50%;
    `
      : ''
    }
  `
);
