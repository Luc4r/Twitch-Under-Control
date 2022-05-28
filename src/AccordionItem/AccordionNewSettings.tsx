import { useState, ChangeEvent, useEffect } from 'react';

import {
  AccordionItemWrapper,
  ChannelSettingsLabel,
  ChannelNameInputWrapper,
  VolumeNumberWrapper,
  VolumeSlider,
  ErrorMessageDisplayer,
  AccordionSettingsWrapper,
  AccordionSettingsContent,
} from './AccordionItem.styles';
import { SVGButton } from '../Accordion/Accordion.styles';
import AddIcon from '../utils/svg/addIcon';
import CloseIcon from '../utils/svg/closeIcon';
import scrollToAccordionElement from '../utils/scroll';

interface AccordionNewSettingsProps {
  channelName: string;
  channelVolume: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddChannel: () => void;
  handleCancelAddingChannel: () => void;
}

const AccordionNewSettings = ({
  channelName,
  channelVolume,
  handleChange,
  handleAddChannel,
  handleCancelAddingChannel,
}: AccordionNewSettingsProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const newChannelElement = document.getElementById('newChannel');

    if (newChannelElement) {
      newChannelElement.classList.add('addAnimation');
      newChannelElement.addEventListener(
        'animationend',
        () => {
          newChannelElement.classList.remove('addAnimation');
          scrollToAccordionElement('newChannel');
        },
        { once: true },
      );
    }
  }, []);

  const handleAddNewChannelSettings = () => {
    if (channelName && channelVolume) {
      handleAddChannel();
    } else {
      setErrorMessage('This field cannot be empty!');
    }
  };

  return (
    <AccordionItemWrapper id="newChannel" isActive={true}>
      <ChannelSettingsLabel>
        <ChannelNameInputWrapper hasFailed={!!errorMessage}>
          <input
            type="string"
            id="newChannelName"
            placeholder="Enter channel name..."
            value={channelName}
            onChange={handleChange}
          />
          {errorMessage && (
            <ErrorMessageDisplayer>{errorMessage}</ErrorMessageDisplayer>
          )}
        </ChannelNameInputWrapper>
        <SVGButton onClick={handleAddNewChannelSettings}>
          <AddIcon />
        </SVGButton>
        <SVGButton onClick={handleCancelAddingChannel}>
          <CloseIcon />
        </SVGButton>
      </ChannelSettingsLabel>
      <AccordionSettingsWrapper isActive={true}>
        <AccordionSettingsContent isActive={true}>
          <VolumeSlider
            type="range"
            min="0"
            max="100"
            step="1"
            id="newChannelVolume"
            value={channelVolume}
            onChange={handleChange}
          />
          <VolumeNumberWrapper useSecondaryStyle={true}>
            <input
              type="string"
              id="newChannelVolume"
              value={channelVolume}
              onChange={handleChange}
            />
          </VolumeNumberWrapper>
        </AccordionSettingsContent>
      </AccordionSettingsWrapper>
    </AccordionItemWrapper>
  );
};

export default AccordionNewSettings;
