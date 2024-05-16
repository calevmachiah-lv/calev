import styled from 'styled-components';

export const FormContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['recap', 'tutorial', 'baseHeightInVH', 'maxHeightInVH'].includes(prop),
})<{
  recap: boolean;
  tutorial?: boolean;
  baseHeightInVH: number;
  maxHeightInVH: number;
}>`
  display: flex;
  flex-direction: column;
  height: ${({ recap, baseHeightInVH, maxHeightInVH }) =>
    recap ? `${maxHeightInVH}px` : `${baseHeightInVH}px`};
  transition: height 0.3s;
  ${({ tutorial, recap }) =>
    !tutorial
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

export const AboveFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  align-items: flex-start;
`;

export const FormContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['openPercentage', 'slidePercentsToClose'].includes(prop),
})<{ openPercentage?: number; slidePercentsToClose: number }>`
  display: flex;
  flex-direction: column;
  padding: 0 25px 20px;
  opacity: ${({ openPercentage, slidePercentsToClose }) =>
    openPercentage
      ? openPercentage < slidePercentsToClose
        ? 0.7 - openPercentage / 100
        : 0
      : 1};
  position: absolute;
  width: 100%;
`;

export const SlideBarContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
`;

export const SlideBar = styled.div`
  width: 56px;
  min-height: 4px;
  background-color: #b4b4b4;
  border-radius: 2px;
  margin: auto;
`;
