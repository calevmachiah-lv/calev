import styled from 'styled-components';

export const ArrowContainer = styled.div(
  ({
    theme: {
      device: { isIpad, isDesktop },
    },
  }) => {
    return `
    position: absolute;
    display:flex;
    flex-direction:row;
    padding: 0 5%;
    left: 0;
    top: 100px;;
    width: 100%;
    z-index:999999;
    ${isDesktop
        ? `justify-content:space-between; gap:50%;`
        : isIpad
          ? `justify-content:space-between; gap:50%`
          : ''
      };
  left: 0;
  top: calc(((100vh - 15vh)/2) + 10px);
`;
  }
);

export const Arrow = styled.div<{ image: string }>`
    width: 10px;
    height: 10px;
    object-fit: contain;
    cursor: pointer;
    background-image: url(${(props: any) => props.image});
    background-position: center;
    background-size: cover;
    grab: 10px;
    border: 2px solid #fff;
    border-radius: 50%;
`;
