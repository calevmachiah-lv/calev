"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.BasicLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
require("../font.scss");
exports.BasicLayout = (0, styled_components_1.createGlobalStyle)(() => `

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'LouisVuitton_Regular', 'Roboto', sans-serif;
    background-color: #fff;
  }

  * {
    touch-action: pan-x pan-y;
  }

  input {
    direction: ltr;
  }

    ::-webkit-scrollbar {
      display: none;
    }

  #deviceToken {
    visibility: hidden;
    height: 0;
    width: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;

  }

  @media only screen and (max-device-width: 1024px) {
    * {
        user-select: none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }
}
.notistack-SnackbarContainer {
  align-items: flex-start !important;
}

}
`);
exports.Version = styled_components_1.styled.div `
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  padding: 10px;
  color: #fff;
  background-color: #000;
`;
const GlobalStyle = ({ children }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(exports.BasicLayout, {}), children] }));
};
exports.default = GlobalStyle;
