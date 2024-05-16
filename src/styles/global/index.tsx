import { createGlobalStyle, styled } from 'styled-components';
import '../font.scss';
import { FC } from 'react';

export const BasicLayout = createGlobalStyle(
  () => `

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
`
);

export const Version = styled.div`
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  padding: 10px;
  color: #fff;
  background-color: #000;
`;

const GlobalStyle: FC<any> = ({ children }) => {
  return (
    <>
      <BasicLayout />
      {children}
    </>
  );
};

export default GlobalStyle;
