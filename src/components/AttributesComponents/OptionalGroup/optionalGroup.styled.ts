import styled from 'styled-components';

export const OptionalGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
interface OpenedAttributesProps {
  open?: boolean;
  disabled?: boolean;
}
export const OpenedAttributes = styled.div<OpenedAttributesProps>(
  ({ open, disabled }) => ({
    padding: '18px 20px',
    border: '1px solid #e6e6e6',
    borderRadius: open ? '20px' : '100px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-radius 0.3s linear',
    textDecoration: disabled ? 'line-through' : 'none',
  })
);
interface AttributesWrapperProps {
  open?: boolean;
}
export const AttributesWrapper = styled.div<AttributesWrapperProps>(
  ({ open }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    /* height: 100%; */
    maxHeight: open ? '50vh' : '0',
    marginTop: open ? '20px' : '0',
    opacity: open ? '1' : '0',
    overflowY: open ? 'auto' : 'hidden',
    transition:
      'max-height 0.2s ease-in-out, margin-top 0.3s ease-in-out, opacity 0.3s ease-in-out',
  })
);
export const ClosedAttributes = styled.div`
  padding: 18px 20px;
  border: 1px solid #e6e6e6;
  border-radius: 100px;
`;

export const RadioButtonTitle = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const ClickableArea = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const RadioButton = styled.img`
  width: 15px;
`;
