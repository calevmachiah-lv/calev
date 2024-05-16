import styled from 'styled-components';
import {
  NEXT_LABEL,
  OOB_APPNAME,
  PREVIOUS_LABEL,
} from '../../../../utils/constants';

interface IAttributesWrapper {
  isActive?: boolean | string | null;
  insideOptionalGroup: boolean;
  optionalGroupIcon: boolean;
}

const optionalGroupIconCss = (isActive: boolean) => `
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
  display: flex;
  flex-wrap: wrap;

  ${
    isActive
      ? `
    max-height: 50vh; 
    margin-top: 20px; 
    opacity: 1; 
    overflow-y: auto;
    `
      : `
    max-height: 0; 
    overflow: hidden; 
    margin-top: 0px; 
    opacity: 0;
    `
  }
  transition: max-height 0.2s ease-in-out, margin-top 0.3s ease-in-out, opacity 0.3s ease-in-out;`;

const optionalGroupCss = (isActive: boolean) => `
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  transition: max-height 0.2s ease-in-out, margin-top 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow-x: hidden; 
  ${
    isActive
      ? `
    max-height: 50vh; 
    margin-top: 20px; 
    opacity: 1; 
    overflow-y: auto;
    `
      : `
    max-height: 0; 
    overflow: hidden; 
    margin-top: 0px; 
    opacity: 0;
    `
  }
`;

export const AttributesWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'isActive',
      'numOfAttrs',
      'insideOptionalGroup',
      'optionalGroupIcon',
    ].includes(prop),
})<IAttributesWrapper>(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
      appName,
    },
    isActive,
    insideOptionalGroup,
    optionalGroupIcon,
  }) => {
    return `
    ${
      insideOptionalGroup
        ? optionalGroupIcon
          ? optionalGroupIconCss(Boolean(isActive))
          : optionalGroupCss(Boolean(isActive))
        : `
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    position: relative;
    font-family: LouisVuitton_Medium;
    padding: 5px 0 80px;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
    ${
      isMobile
        ? isActive === NEXT_LABEL
          ? `animation: slide-in-right 0.4s ease-in-out forwards;`
          : isActive === PREVIOUS_LABEL
          ? `animation: slide-in-left 0.4s ease-in-out forwards;`
          : `display: none;`
        : isIpad
        ? isActive
          ? `border-bottom: 1px solid #E0D7D5; padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 20px;`
          : `max-height: 0; padding-top: 0; padding-bottom: 0; overflow: hidden; padding-left: 20px; padding-right: 20px;`
        : isDesktop
        ? isActive
          ? `
          border-bottom: 1px solid #E0D7D5;
          padding: 20px;
          ${
            appName === OOB_APPNAME
              ? `padding-top: 0px; padding-bottom: 0px;`
              : ``
          }
        `
          : `max-height: 0; padding-top: 0; padding-bottom: 0; overflow: hidden; padding-left: 20px; padding-right: 20px;`
        : ``
    }
    ${isDesktop && appName === OOB_APPNAME ? `border: none;` : ``}
    `
    }
  `;
  }
);
