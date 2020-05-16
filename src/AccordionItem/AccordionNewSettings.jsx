import React, { useState, Fragment } from 'react';

import { 
  AccordionItemWrapper, 
  ChannelSettingsLabel,
  ChannelNameInputWrapper,
  VolumeNumberWrapper, 
  VolumeSlider, 
  ErrorMessageDisplayer 
} from "./AccordionItem.styles";
import { SVGButton } from "../Accordion/Accordion.styles";
import AddIcon from "../utils/svg/addIcon";
import CloseIcon from "../utils/svg/closeIcon";

const AccordionNewSettings = ({ 
	channelName, 
	channelVolume,
  handleChange,
  handleAddChannel,
  handleCancelAddingChannel
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddNewChannelSettings = () => {
		if (channelName && channelVolume) {
      handleAddChannel();
		} else {
			setErrorMessage("This field cannot be empty!");
		}
  };

  return (
    <AccordionItemWrapper id="newChannel" active={true}>
      <Fragment>
        <ChannelSettingsLabel>
          <ChannelNameInputWrapper hasFailed={!!errorMessage}>
            <input 
              type="string" 
              id="newChannelName"
              placeholder="Enter channel name..."
              value={channelName}
              onChange={handleChange} 
            />
            {errorMessage &&
              <ErrorMessageDisplayer>
                {errorMessage}
              </ErrorMessageDisplayer>
            }
          </ChannelNameInputWrapper>
          <SVGButton onClick={handleAddNewChannelSettings}>
            <AddIcon />
          </SVGButton>
          <SVGButton onClick={handleCancelAddingChannel}>
            <CloseIcon />
          </SVGButton>
        </ChannelSettingsLabel>
        <div className='inner'>
          <div className='content'>
            <VolumeSlider 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              id="newChannelVolume" 
              value={channelVolume} 
              onChange={handleChange} 
            />
            <VolumeNumberWrapper addingNew={true}>
              <input 
                type="string" 
                id="newChannelVolume" 
                value={channelVolume}
                onChange={handleChange} 
              />
            </VolumeNumberWrapper>
          </div>
        </div>
      </Fragment>
    </AccordionItemWrapper>
  );
};

export default AccordionNewSettings;