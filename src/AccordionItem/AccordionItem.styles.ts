import styled from 'styled-components';

interface AccordionItemProps {
  isActive?: boolean;
}

export const AccordionItemWrapper = styled.div<AccordionItemProps>`
  position: relative;
  background-color: #292929;

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }

  &.addAnimation {
    animation: addItem 0.3s;
  }

  &.cancelAddingAnimation {
    animation: cancelAddingItem 0.3s;
  }

  @keyframes addItem {
    0% {
      height: 70px;
      opacity: 0;
      transform: rotateY(-90deg) scaleY(0);
    }
    100% {
      height: 140px;
      opacity: 1;
      transform: rotateY(0) scaleY(1);
    }
  }

  @keyframes removeItemNotActive {
    0% {
      height: 70px;
      transform: rotateY(0) scaleY(1);
    }
    100% {
      height: 0px;
      transform: rotateY(-90deg) scaleY(0);
    }
  }

  @keyframes removeItemActive {
    0% {
      height: 140px;
      transform: rotateY(0) scaleY(1);
    }
    100% {
      height: 0px;
      transform: rotateY(-90deg) scaleY(0);
    }
  }

  @keyframes cancelAddingItem {
    0% {
      height: 140px;
      opacity: 1;
      transform: rotateY(0) scaleY(1);
    }
    100% {
      height: 70px;
      opacity: 0;
      transform: rotateY(-90deg) scaleY(0);
    }
  }
`;

export const AccordionChannelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  transition-duration: 0.3s;
`;

export const AccordionChannelName = styled.span<AccordionItemProps>`
  margin: 0 8px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ isActive }) => (isActive ? '#c9c9c9' : '#696969')};
`;

export const AccordionSettingsWrapper = styled.div<AccordionItemProps>`
  background-color: #393939;
  overflow: hidden;
  transition-duration: 0.3s;
  height: ${({ isActive }) => (isActive ? '70px' : '0px')};
`;

export const AccordionSettingsContent = styled.div<AccordionItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  transition-duration: 0.3s;
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
`;

export const ChannelSettingsLabel = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChannelNameInputWrapper = styled.div<{ hasFailed?: boolean }>`
  margin: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  input[type='string'] {
    width: 90%;
    text-align: center;
    font-size: 16px;
    color: #c9c9c9;
    background: none;
    outline: none;
    border: none;
    border-bottom: ${({ hasFailed }) =>
      hasFailed ? '1px dashed #cf3333' : '1px dashed #c9c9c9'};
  }
`;

interface VolumeProps {
  useSecondaryStyle?: boolean;
}

export const VolumeNumberWrapper = styled.div<VolumeProps>`
  position: relative;
  display: inline-block;
  width: ${({ useSecondaryStyle }) => (useSecondaryStyle ? '35%' : '15%')};
  margin-top: -0.2em;

  input[type='string'] {
    width: 80%;
    text-align: center;
    font-size: 20px;
    color: #c9c9c9;
    background: none;
    outline: none;
    border: none;
    border-bottom: 1px dashed #c9c9c9;
  }

  &::after {
    content: '%';
    font-family: sans-serif;
    position: absolute;
    height: 1em;
    top: 50%;
    right: -1em;
    color: #c9c9c9;
    pointer-events: none;
    transform: translateY(-50%);
  }
`;

interface SliderProps extends VolumeProps {
  value: string | number;
}

export const VolumeSlider = styled.input<SliderProps>`
  width: ${({ useSecondaryStyle }) => (useSecondaryStyle ? '80%' : '60%')};
  height: 15px;
  border-radius: 5px;
  -webkit-appearance: none;
  outline: none;
  background: ${({ value }) =>
    value > 50
      ? `linear-gradient(to right, #517edb ${value}%, #c9c9c9 ${
          100 - Number(value)
        }%)`
      : `linear-gradient(to left, #c9c9c9 ${
          100 - Number(value)
        }%, #517edb ${value}%)`};

  &::-webkit-slider-thumb {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    -webkit-appearance: none;
    background-color: #517edb;
    border: 1px solid #2350a9;
    cursor: pointer;
    transition-duration: 0.3s;

    &:hover {
      background-color: #658fe4;
    }
  }
`;

export const ErrorMessageDisplayer = styled.i`
  font-weight: 100;
  font-size: 13px;
  color: #cf3333;
`;
