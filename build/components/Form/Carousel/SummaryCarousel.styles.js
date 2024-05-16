"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousButton = exports.FinishButton = exports.NavigationButton = exports.ButtonImg = exports.ButtonContainer = exports.Heading = exports.Slide = exports.CarouselContainer = void 0;
const styled_components_1 = require("styled-components");
exports.CarouselContainer = styled_components_1.styled.div `
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  width: 100%;
`;
exports.Slide = styled_components_1.styled.div `
  flex: 1 0 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
exports.Heading = styled_components_1.styled.h2 `
  font-size: 17px;
  margin-bottom: 10px;
`;
exports.ButtonContainer = styled_components_1.styled.div `
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.5vh;
  height: 7.5svh;
  border-top: 1px solid #e6e6e6;
`;
exports.ButtonImg = styled_components_1.styled.img `
  width: 26px;
`;
exports.NavigationButton = styled_components_1.styled.button `
  background-color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
`;
exports.FinishButton = (0, styled_components_1.styled)(exports.NavigationButton) `
  color: #000000;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
`;
exports.PreviousButton = (0, styled_components_1.styled)(exports.NavigationButton) `
  border-right: 1px solid #e6e6e6;
`;
