"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionIcon = exports.DescriptionIconWrapper = exports.FilterTitle = exports.FiltersTitlesWrapper = exports.FiltersWrapper = exports.FiltersComponentWrapper = exports.ItemName = exports.ItemNameWrapper = exports.ItemNoImg = exports.ItemImg = exports.ContainerStyle = exports.ItemWrapper = exports.ItemsWrapper = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const constants_1 = require("../../../utils/constants");
exports.ItemsWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['insideOptionalGroup', 'isActiveFilter', 'isPatch'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, size, insideOptionalGroup, isActiveFilter, }) => (0, styled_components_1.css) `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    width: 100%;

    @keyframes reverseSlideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    ${isActiveFilter &&
    (0, styled_components_1.css) `
      animation: reverseSlideIn 0.3s ease-in;
    `}

    @media (min-width: 1024px) {
      gap: 8px 4px;
      ${size === 'VERTICAL_SIZE_LABEL' &&
    (0, styled_components_1.css) `
        gap: 10px;
        flex-wrap: wrap;
      `}
    }

    ${isMobile &&
    (0, styled_components_1.css) `
      gap: 12px 8px;
    `}

    ${isIpad &&
    (0, styled_components_1.css) `
      gap: 8px 4px;
      ${appName !== constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        ${size === constants_1.SMALL_SIZE_LABEL &&
            (0, styled_components_1.css) `
          ${insideOptionalGroup &&
                (0, styled_components_1.css) `
            width: 350px;
          `}
        `}
      `}
    `}

    ${isDesktop &&
    (0, styled_components_1.css) `
      gap: 8px 4px;
      ${appName !== constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        ${size === constants_1.SMALL_SIZE_LABEL &&
            (0, styled_components_1.css) `
          ${insideOptionalGroup &&
                (0, styled_components_1.css) `
            width: 350px;
          `}
        `}
      `}
    `}

    ${appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      gap: 25px 12px;
      ${size === constants_1.SMALL_SIZE_LABEL &&
        (0, styled_components_1.css) `
        ${insideOptionalGroup &&
            (0, styled_components_1.css) `
          width: 350px;
        `}
      `}
      ${size === constants_1.BIG_SIZE_LABEL &&
        (0, styled_components_1.css) `
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      `}
    `}
  `);
exports.ItemWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => (0, styled_components_1.css) `
    cursor: pointer;
    position: relative;
    overflow: hidden;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    max-width: 150px;
    text-overflow: ellipsis;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;

    ${appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      align-items: center;
      text-align: center;
      gap: 10px;
    `}
  `);
exports.ContainerStyle = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, size, selected, }) => (0, styled_components_1.css) `
    width: 100%;
    border-radius: 5px;
    aspect-ratio: 16 / 9;
    border: 1px solid #000;

    ${size === constants_1.VERTICAL_SIZE_LABEL &&
    (0, styled_components_1.css) `
      aspect-ratio: 4 / 5;
    `}

    ${!selected &&
    (0, styled_components_1.css) `
      border: 1px solid transparent;
    `}


    ${appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      border-radius: 50%;
      width: 80%;
      aspect-ratio: 1 / 1;
      ${size === constants_1.SMALL_SIZE_LABEL &&
        `${isMobile
            ? (0, styled_components_1.css) `
              width: 50%;
            `
            : (0, styled_components_1.css) `
              width: 40%;
            `}`}
    `}
  `);
exports.ItemImg = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['backgroundImageKind', 'backgroudToDisplay', 'isToneOnTone'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, isToneOnTone, selected, backgroundImageKind, backgroudToDisplay, }) => (0, styled_components_1.css) `
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    justify-self: flex-start;
    background-repeat: no-repeat;
    background-position: center;

    ${backgroundImageKind
    ? (0, styled_components_1.css) `
          background-image: url('${backgroudToDisplay}');
        `
    : (0, styled_components_1.css) `
          background-color: ${backgroudToDisplay};
        `}

    ${isToneOnTone
    ? (0, styled_components_1.css) `
          background-size: contain;
        `
    : (0, styled_components_1.css) `
          background-size: cover;
        `}

      ${selected &&
    (0, styled_components_1.css) `
      border: 2px solid #fff;
    `}

    
   ${appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      border-radius: 50%;
    `}
  `);
exports.ItemNoImg = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, size, selected, isImage }) => (0, styled_components_1.css) `
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f7f6f4;
    aspect-ratio: 16 / 9;
    width: 50%;

    ${selected
    ? (0, styled_components_1.css) `
          border: 1px solid #000;
        `
    : (0, styled_components_1.css) ``}

    ${isMobile &&
    (0, styled_components_1.css) `
      ${appName !== constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        justify-self: flex-start;
        width: 100%;

        ${size === constants_1.SMALL_SIZE_LABEL && (selected ? (0, styled_components_1.css) `` : (0, styled_components_1.css) ``)}

        ${size === constants_1.BIG_SIZE_LABEL && (selected ? (0, styled_components_1.css) `` : (0, styled_components_1.css) ``)}

        ${size === constants_1.VERTICAL_SIZE_LABEL &&
            (selected
                ? (0, styled_components_1.css) `
              aspect-ratio: 4 / 5;
            `
                : (0, styled_components_1.css) `
              aspect-ratio: 4 / 5;
            `)}
      `}
    `}

    ${isIpad &&
    (0, styled_components_1.css) `
      ${appName !== constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        width: 100%;

        ${selected && (0, styled_components_1.css) ``}

        ${size === constants_1.SMALL_SIZE_LABEL && (selected ? (0, styled_components_1.css) `` : (0, styled_components_1.css) ``)}

        ${size === constants_1.BIG_SIZE_LABEL && (selected ? (0, styled_components_1.css) `` : (0, styled_components_1.css) ``)}

        ${size === constants_1.VERTICAL_SIZE_LABEL &&
            (0, styled_components_1.css) `
          aspect-ratio: 4 / 5;
        `}
      `}
    `}

    ${isDesktop &&
    (0, styled_components_1.css) `
      ${appName !== constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        width: 100%;
      `}
      ${size === constants_1.VERTICAL_SIZE_LABEL &&
        (0, styled_components_1.css) `
        aspect-ratio: 4 / 5;
      `}
    `}

    ${isDesktop &&
    (0, styled_components_1.css) `
      ${appName === constants_1.OOB_APPNAME &&
        (0, styled_components_1.css) `
        ${size === constants_1.SMALL_SIZE_LABEL &&
            (0, styled_components_1.css) `
          max-height: 55px;
        `}
        ${size === constants_1.BIG_SIZE_LABEL && isImage &&
            (0, styled_components_1.css) `
          width: 80%;
          text-transform: uppercase;
          font-size: 24px;
          line-height: 1;
          `}
        aspect-ratio: 1 / 1;
        border-radius: 50%;
      `}
    `}
  `);
exports.ItemNameWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => (0, styled_components_1.css) `
    display: flex;
    gap: 5px;
    align-items: start;
    width: 100%;
  `);
exports.ItemName = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => (0, styled_components_1.css) `
    font-size: 11px;
    font-weight: 400;
    text-transform: capitalize;
    color: #000;
    flex-wrap: nowrap;
    width: 100%;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `);
exports.FiltersComponentWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => (0, styled_components_1.css) `
    display: flex;
    flex-direction: column;
    gap: 6px;
  `);
exports.FiltersWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => (0, styled_components_1.css) `
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
  `);
exports.FiltersTitlesWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, }) => (0, styled_components_1.css) `
    display: flex;
    gap: 15px;
    overflow-x: auto;
    margin: 5px 0 15px;

    ${isDesktop &&
    appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      margin-bottom: 30px;
      width: fit-content;
      border-bottom: 1px solid #f7f6f4;
    `}
  `);
exports.FilterTitle = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isActive'].includes(prop),
})(({ theme: { device: { isDesktop }, appName, }, isActive, }) => (0, styled_components_1.css) `
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    color: ${isActive ? (0, styled_components_1.css) `#000` : (0, styled_components_1.css) `rgba(0, 0, 0, 0.20)`};
    text-transform: uppercase;

    ${isDesktop &&
    appName === constants_1.OOB_APPNAME &&
    (0, styled_components_1.css) `
      height: 25px;

      ${isActive &&
        (0, styled_components_1.css) `
        border-bottom: 1px solid #000;
        transition: border-bottom 0.5s ease-in-out;
      `}
    `}
  `);
exports.DescriptionIconWrapper = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, }, }) => (0, styled_components_1.css) `
    display: flex;
    align-items: center;
    justify-content: center;
  `);
exports.DescriptionIcon = styled_components_1.default.img `
  width: 15px;
  cursor: pointer;
`;
