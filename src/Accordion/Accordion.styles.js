import styled from 'styled-components';

const AccordionWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SVGButton = styled.button`
  display: block;
  margin: ${props => props.center ? "16px auto 8px auto" : "16px 16px 8px 0"};
  height: ${props => props.center ? "50px" : "auto"};
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  svg {
    height: 32px !important;
    padding: 0 !important;
  };
`;

export { 
  AccordionWrapper, 
  SVGButton 
};