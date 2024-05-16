"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusImage = exports.PlusContainer = exports.DoneButtonWrapper = exports.ValueImg = exports.Value = exports.ValueWrapper = exports.AttributeValues = exports.AttributeTitle = exports.AttributeWrapper = exports.ConfigurationWrapper = exports.RecapWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.RecapWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['show', 'openPercentage', 'slidePercentsToOpen'].includes(prop),
})(({ theme: { device: { isMobile }, }, show, openPercentage, slidePercentsToOpen, }) => {
    return `
    display: flex;
    flex-direction: column;
    padding: 0 25px 20px;
    margin-top: 20px;
    overflow-y: auto;
    opacity: ${openPercentage
        ? openPercentage >= slidePercentsToOpen
            ? openPercentage / 100
            : 0
        : openPercentage === 0
            ? 0
            : 1};
    transition: all 0.5s ease;
    width: 100%;
    height: 100%;
    z-index: ${show ? 100 : -1};
  ${!isMobile
        ? `
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 50%;
      margin: 0;
      background-color: #fff;
      @media (max-height: 760px) {
      padding: 40px 8% 20px;
      }
      @media (min-height: 765px) {
        padding: 100px 8% 40px;
      }
      transform: ${show ? `translateX(0)` : `translateX(100%)`};
    `
        : ``}
  `;
});
exports.ConfigurationWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  height: -webkit-fill-available;
`;
exports.AttributeWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #efefef;
  &:last-child {
    border-bottom: none;
  }
`;
exports.AttributeTitle = styled_components_1.default.div `
  font-size: 14px;
`;
exports.AttributeValues = styled_components_1.default.div `
  display: flex;
  gap: 10px;
  cursor: pointer;
`;
exports.ValueWrapper = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['inStock', 'isEmpty'].includes(prop),
}) `
  display: flex;
  align-items: center;
  ${({ isEmpty }) => isEmpty
    ? `
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #bbbbbb;
      text-align: center;
      line-height: 30px;
      font-size: 20px;`
    : ''}
  ${({ inStock }) => !inStock
    ? `&::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #C53929;`
    : ''}
`;
exports.Value = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['isEmpty'].includes(prop),
}) `
  font-size: ${({ isEmpty }) => (isEmpty ? '20px' : '14px')};
  margin: ${({ isEmpty }) => (isEmpty ? '0' : '5px')};
  color: ${({ isEmpty }) => (isEmpty ? '#999999' : '')};
`;
exports.ValueImg = styled_components_1.default.img `
  width: 2rem;
`;
exports.DoneButtonWrapper = styled_components_1.default.div `
  @media (orientation: landscape) {
    width: 360px;
    margin: auto;
  }
`;
exports.PlusContainer = styled_components_1.default.div.withConfig({
    shouldForwardProp: (prop) => !['img'].includes(prop),
})(({ theme: { device: { isMobile, isIpad, isDesktop }, }, img, }) => {
    return `
  width: 100%;
  max-width: 2rem;
  background-image: url(${img});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  cursor: pointer;
  @media (orientation: landscape) {
    width: unset;
    max-height: 60%;
  }
`;
});
exports.PlusImage = styled_components_1.default.img `
  visibility: hidden;
  width: 100%;
  @media (orientation: landscape) {
    width: unset;
    height: 100%;
  }
`;
