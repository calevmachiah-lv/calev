"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousButton = exports.FinishButton = exports.NextButton = exports.ButtonImg = exports.ButtonContainer = exports.Slide = exports.CarouselContainer = void 0;
const styled_components_1 = require("styled-components");
exports.CarouselContainer = styled_components_1.styled.div `
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  z-index: 10;
  flex: 1;
`;
exports.Slide = styled_components_1.styled.div `
  padding: 0 20px;
  height: 100%;
`;
exports.ButtonContainer = styled_components_1.styled.div `
  display: flex;
  position: fixed;
  border-top: 1px solid #e6e6e6;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  gap:15px;
`;
exports.ButtonImg = styled_components_1.styled.img `
  width: 26px;
`;
exports.NextButton = styled_components_1.styled.button(({ disabled = false }) => {
    return `
  background-color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 50%;
  &:first-child {
    border-right: 1px solid #e6e6e6;
  }
  ${disabled
        ? `
      cursor: default;
      pointer-events: none;
      /* NOTE: opacity only for the icon inside the button. */
      > * {
        opacity: 0.5;
      }
    `
        : ``}
`;
});
exports.FinishButton = (0, styled_components_1.styled)(exports.NextButton) `
  color: #000000;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
`;
exports.PreviousButton = (0, styled_components_1.styled)(exports.NextButton) ``;
