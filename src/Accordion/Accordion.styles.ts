import styled from 'styled-components';

export const AccordionWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SVGButton = styled.button<{ align?: 'left' | 'center' | 'right' }>`
  display: block;
  margin: ${({ align }) =>
    align === 'center' ? '16px auto 8px auto' : '16px 16px 8px 0'};
  height: ${({ align }) => (align === 'center' ? '50px' : 'auto')};
  padding: 0;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    height: 32px !important;
    padding: 0 !important;
  }
`;
