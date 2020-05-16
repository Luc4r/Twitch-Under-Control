import styled from "styled-components";

const AccordionItemWrapper = styled.div`
  position: relative;
  background-color: #292929;

  &:not(:last-of-type) {
    margin-bottom: 4px;
  };

  .channelButton {
    width: 100%;
    display: block;
    min-height: 100%;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    transition-duration: 0.3s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${props => props.active ? "#c9c9c9" : "#696969"};
  };

  .inner {
    background-color: #393939;
    overflow: hidden;
    transition-duration: 0.3s;
    height: ${props => props.active ? "70px" : "0px"};
  };

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    transition-duration: 0.3s;
    opacity: ${props => props.active ? "1" : "0"};
  };

  &.addAnimation {
    animation: addItem .5s;
  };

  &.cancelAddingAnimation {
    animation: cancelAddingItem .3s;
  };

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
  };

  @keyframes removeItemNotActive {
    0% {
      height: 70px;
      transform: rotateY(0) scaleY(1);
    }
    100% {
      height: 0px;
      transform: rotateY(-90deg) scaleY(0);
    }
  };

  @keyframes removeItemActive {
    0% {
      height: 140px;
      transform: rotateY(0) scaleY(1);
    }
    100% {
      height: 0px;
      transform: rotateY(-90deg) scaleY(0);
    }
  };

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
  };
`;

const ChannelSettingsLabel = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
`;

const ChannelNameInputWrapper = styled.div`
  margin: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  input[type="string"] {
    width: 90%;
    text-align: center;
    font-size: 16px;
    color: #c9c9c9;
    background: none;
    outline: none;
    border: none;
    border-bottom: ${props => props.hasFailed 
      ? "1px dashed #cf3333" 
      : "1px dashed #c9c9c9"
    };
  };
`;

const VolumeNumberWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => props.addingNew ? "35%" : "15%"};
  margin-top: -0.2em;

  input[type=string] {
    width: 80%;
    text-align: center;
    font-size: 20px;
    color: #c9c9c9;
    background: none;
    outline: none;
    border: none;
    border-bottom: 1px dashed #c9c9c9;
  };

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
  };
`;

const VolumeSlider = styled.input`
  width: ${props => props.addingNew ? "80%" : "60%"};
  height: 15px;
  border-radius: 5px;  
  -webkit-appearance: none;
  outline: none;
  background: ${props => props.value > 50
    ? `linear-gradient(to right, #517edb ${props.value}%, #c9c9c9 ${100 - props.value}%)` 
    : `linear-gradient(to left, #c9c9c9 ${100 - props.value}%, #517edb ${props.value}%)`
  };

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
    };
  };
`;

const ErrorMessageDisplayer = styled.i`
  font-weight: 100;
  font-size: 13px;
  color: #cf3333;
`;

export { 
  AccordionItemWrapper, 
  ChannelSettingsLabel,
  ChannelNameInputWrapper,
  VolumeNumberWrapper, 
  VolumeSlider,
  ErrorMessageDisplayer
};