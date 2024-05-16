import styled from 'styled-components';

export const MainWrapper = styled.div(
  ({
    theme: {
      device: { isMobile },
    },
  }) => `
  color: #19110b;
  overflow-y: auto;
  background-color: #fff;
  transition: transform 0.3s, height 0.3s;

`
);

export const DataWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['open'].includes(prop),
})<{
  open: boolean;
}>(
  ({
    theme: {
      device: { isMobile },
    },
    open,
  }) => `
  color: #19110b;
  overflow-y: auto;
  background-color: #fff;
  transition: all 0.3s;
  height: 100%;
  position: fixed;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 100;
  ${
    open
      ? `
      top: 0;
  `
      : `
    top: 100vh;
  `
  }
`
);

export const CloseButton = styled.img(
  ({
    theme: {
      device: { isMobile },
    },
  }) => `
  position: absolute;
  cursor: pointer;
  top: 0;
  &.back {
  left: 0;
  width: 9px;
  }
  &.close {
  right: 0;
  width: 16px;
  }
`
);

export const Title = styled.div.withConfig({
  shouldForwardProp: (prop) => !['firstPage'].includes(prop),
})<{
  firstPage: boolean;
}>(
  ({
    theme: {
      device: { isMobile },
    },
    firstPage,
  }) => `
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-left: ${firstPage ? '0' : '20px'};
`
);

export const Text = styled.div(
  ({
    theme: {
      device: { isMobile },
    },
  }) => `
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 40px;
`
);

export const ButtonsWrapper = styled.div(
  ({
    theme: {
      device: { isMobile },
    },
  }) => `
  display: flex;
  flex-direction: column;
  gap: 20px;
`
);

export const ButtonWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  display:flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  .thumbnail {
    width: 40px;
  }
  .arrow {
    height: 12px;
    margin-left: auto;
  }
`
);

export const ButtonTextWrapper = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  display: flex;
  flex-direction: column;
  gap: 5px;
`
);

export const ButtonLabel = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  font-size: 14px;
  line-height: 20px;
`
);

export const ButtonSubLabel = styled.div(
  ({
    theme: {
      device: { isMobile, isIpad, isDesktop },
    },
  }) => `
  color: #5E5A56;
  font-size: 14px;
  line-height: 20px;
`
);
