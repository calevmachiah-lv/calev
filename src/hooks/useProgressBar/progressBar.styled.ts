import styled from 'styled-components';

interface WrapperProps {
  isVertical?: boolean;
  barHeight?: string;
  barWidth?: string;
  progressPercents?: string;
}

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isVertical', 'barHeight', 'barWidth', 'progressPercents'].includes(prop),
})<WrapperProps>`
  position: relative;
  width: ${(props) => (props.isVertical ? props.barHeight : props.barWidth)};
  height: ${(props) => (props.isVertical ? props.barWidth : props.barHeight)};
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  margin: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    [dir='rtl'] & {
      right: 0;
      left: auto;
    }
    width: ${(props) => (props.isVertical ? '1px' : props.progressPercents)};
    height: ${(props) => (props.isVertical ? props.progressPercents : '1px')};
    background-color: #000000;
    transition: width 0.3s ease-in-out;
  }
`;
