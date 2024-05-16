import styled from 'styled-components';

export const AttributesContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (orientation: landscape) {
    width: 40%;
    height: fit-content;
  }
`;

export const AttributesFlex = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
  @media (orientation: landscape) {
    height: 100%;
    gap: 40px;
  }
`;
