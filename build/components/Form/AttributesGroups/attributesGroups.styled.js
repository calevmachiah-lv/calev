"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBarWrapper = exports.GroupWrapper = exports.GroupsWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.GroupsWrapper = styled_components_1.default.div(({ theme: { device: { isMobile }, }, }) => {
    return `
      ${isMobile ? 'height: 100%;' : ''}
      `;
});
exports.GroupWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isActive'].includes(prop),
}) `
  display: flex;
  flex-direction: column;
  ${({ theme, isActive }) => {
    const { isMobile, isIpad, isDesktop } = theme.device;
    return `
      ${isActive && 'height: 100%;'}
      ${isMobile
        ? ''
        : isIpad
            ? 'height: unset; gap: 0;'
            : isDesktop
                ? 'height: unset; gap: 0;'
                : ''}`;
}}
`;
exports.ProgressBarWrapper = styled_components_1.default.div `
  height: fit-content;
  padding-bottom: 15px;
`;
