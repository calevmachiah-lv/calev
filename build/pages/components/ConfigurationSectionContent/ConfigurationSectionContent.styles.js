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
exports.BackgroundColor = exports.AttributeLabel = exports.AttributeWrapper = exports.AttributeThumbnail = exports.ComponentWrapper = exports.TextSummary = exports.AttributeValue = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const constants_1 = require("../../../utils/constants");
exports.AttributeValue = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isPatchAttribute', 'page'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, page, isPatchAttribute, }) => {
    return page === 'summary'
        ? (0, styled_components_1.css) `
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;

          ${isPatchAttribute &&
            (0, styled_components_1.css) `
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

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              text-transform: capitalize;
            `
            : ''}
        `
        : (0, styled_components_1.css) `
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          text-transform: capitalize;

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              flex-direction: column;
              width: 100px;
              text-align: center;
            `
            : ''}
        `;
});
exports.TextSummary = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isPatchAttribute', 'page', 'uppercase'].includes(prop),
})(({ page, isPatchAttribute = false }) => {
    return page === 'summary'
        ? (0, styled_components_1.css) `
        border-radius: 5px;
        font-size: 13px;
        font-weight: 500;
        text-transform: ${!isPatchAttribute ? 'capitalize' : 'none'};

        ${isPatchAttribute &&
            (0, styled_components_1.css) `
          margin: auto;
        `}
      `
        : '';
});
exports.ComponentWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['page'].includes(prop),
})(({ theme: { device: { isMobile }, }, page, }) => {
    return page === 'summary'
        ? (0, styled_components_1.css) `
          display: flex;
          flex-direction: ${isMobile ? '' : 'row-reverse'};
          gap: 15px;
          justify-content: center;
          align-items: center;
        `
        : '';
});
exports.AttributeThumbnail = styled_components_1.default.img(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, src, page, }) => {
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
                    : ''}

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              width: 26px;
              height: 26px;
              border-radius: 50%;
            `
            : ''}
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
                    : ''}

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              width: 25px;
              height: 25px;
              border-radius: 50%;
            `
            : ''}
        `;
});
exports.AttributeWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['page'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, page, }) => {
    return page === 'summary'
        ? (0, styled_components_1.css) `
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

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              border-bottom: none;
              padding: 25px 20px;
            `
            : ''}
        `
        : (0, styled_components_1.css) `
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

          ${appName === constants_1.OOB_APPNAME && isDesktop
            ? `
              padding: 25px 20px;
              border: none;
            `
            : ''}
        `;
});
exports.AttributeLabel = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['page'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, page, }) => page === 'summary'
    ? (0, styled_components_1.css) `
          font-size: 15px;
          font-weight: 600;
          text-wrap: balance;

          ${appName === constants_1.OOB_APPNAME && isDesktop
        ? `
              text-transform: capitalize;
            `
        : ''}
        `
    : (0, styled_components_1.css) `
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
        `);
exports.BackgroundColor = styled_components_1.default.div(({ theme: { device: { isMobile, isIpad, isDesktop }, appName, }, backgroundColor, }) => `
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
            : ''}

    ${appName === constants_1.OOB_APPNAME && isDesktop
    ? `
        width: 26px;
        height: 26px;
        border-radius: 50%;
    `
    : ''}
  `);
