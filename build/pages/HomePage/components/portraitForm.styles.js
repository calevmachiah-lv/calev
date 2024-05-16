"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideBar = exports.SlideBarContainer = exports.FormContentWrapper = exports.AboveFormContainer = exports.FormContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.FormContainer = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['recap', 'tutorial', 'baseHeightInVH', 'maxHeightInVH'].includes(prop),
}) `
  display: flex;
  flex-direction: column;
  height: ${({ recap, baseHeightInVH, maxHeightInVH }) => recap ? `${maxHeightInVH}px` : `${baseHeightInVH}px`};
  transition: height 0.3s;
  ${({ tutorial, recap }) => !tutorial
    ? `
    position: fixed;
    overflow-y: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: white;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  `
    : ''}
  border-radius: 24px 24px 0 0;
`;
exports.AboveFormContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  align-items: flex-start;
`;
exports.FormContentWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['openPercentage', 'slidePercentsToClose'].includes(prop),
}) `
  display: flex;
  flex-direction: column;
  padding: 0 25px 20px;
  opacity: ${({ openPercentage, slidePercentsToClose }) => openPercentage
    ? openPercentage < slidePercentsToClose
        ? 0.7 - openPercentage / 100
        : 0
    : 1};
  position: absolute;
  width: 100%;
`;
exports.SlideBarContainer = styled_components_1.default.div `
  display: flex;
  align-items: center;
  min-height: 44px;
`;
exports.SlideBar = styled_components_1.default.div `
  width: 56px;
  min-height: 4px;
  background-color: #b4b4b4;
  border-radius: 2px;
  margin: auto;
`;
