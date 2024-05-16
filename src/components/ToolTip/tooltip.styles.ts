import styled from 'styled-components';

interface IToolTipWrapper {
  show: boolean;
}

export const TooltipWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['show'].includes(prop),
})<IToolTipWrapper>(({ show }) => {
  return `
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
  opacity: ${show ? '1' : '0'};
  visibility: ${show ? '' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, height 0.3s ease-in-out;
  width: 390px;
  overflow-y: auto;
  min-height: 121px;
  text-align: left;
`;
});

export const TooltipArrow = styled.div`
  position: fixed;
  width: 0;
  height: 0;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 15px;
`;

export const TooltipHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

export const TooltipImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const TooltipTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-feature-settings: 'case' on;
  line-height: 22px;
`;

export const TooltipText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-feature-settings: 'case' on;
`;
