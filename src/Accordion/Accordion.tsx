import React, { ChangeEvent, useMemo, useState } from 'react';

import { AccordionWrapper, SVGButton } from './Accordion.styles';
import { SoundSetting } from '../App';
import AccordionNewSettings from '../AccordionItem/AccordionNewSettings';
import AccordionItem from '../AccordionItem/AccordionItem';
import AddIcon from '../utils/svg/addIcon';
import scrollToAccordionElement from '../utils/scroll';

const ADDING_SETTINGS_INDEX = -1;

interface AccordionProps {
  items: SoundSetting;
  handleChannelSettingsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addChannelSettings: Function;
  removeChannelSettings: Function;
}

const Accordion = ({
  items,
  handleChannelSettingsChange,
  addChannelSettings,
  removeChannelSettings,
}: AccordionProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAddingNewChannel, setAddingNewChannelState] =
    useState<boolean>(false);
  const [newChannelName, setNewChannelName] = useState<string>('');
  const [newChannelVolume, setNewChannelVolume] = useState<string>('');

  const allChannelNames = useMemo(() => items && Object.keys(items), [items]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.id;
    let value: string | number = event.target.value;

    if (type === 'newChannelVolume') {
      const volumeInt = parseInt(value, 10);

      if (volumeInt < 0 || isNaN(volumeInt)) {
        value = 0;
      } else if (volumeInt > 100) {
        value = 100;
      } else {
        value = volumeInt;
      }
      setNewChannelVolume(String(value));
    } else {
      setNewChannelName(value);
    }
  };

  const handleActivateTab = (index: number) => {
    const newActiveTab = activeTab === index ? -1 : index;

    setActiveTab(newActiveTab);
    if (isAddingNewChannel) {
      handleCancelAddingChannel();
    }
    if (newActiveTab !== -1) {
      scrollToAccordionElement(`channel${newActiveTab}`, newActiveTab);
    }
  };

  const handleNewChannelSettings = () => {
    setActiveTab(ADDING_SETTINGS_INDEX);
    setAddingNewChannelState(true);
  };

  const handleAddChannel = () => {
    if (newChannelName && newChannelVolume) {
      const channelIndex = (items && Object.keys(items).length) || 0;

      addChannelSettings(newChannelName, newChannelVolume);
      setActiveTab(channelIndex);
      setAddingNewChannelState(false);
      setNewChannelName('');
      setNewChannelVolume('50');
      scrollToAccordionElement(`channel${channelIndex}`); // TODO, timeout?
    }
  };

  const handleDeleteChannel = (channelName: string) => {
    const channelIndex = Object.keys(items).indexOf(channelName);
    const channelElement = document.getElementById(`channel${channelIndex}`);

    if (channelIndex <= activeTab) {
      setActiveTab(activeTab - 1);
    }

    if (channelElement) {
      channelElement.style.animation =
        channelIndex === activeTab
          ? 'removeItemActive .3s'
          : 'removeItemNotActive .3s';
      channelElement.addEventListener(
        'animationend',
        () => {
          channelElement.style.animation = '';
          removeChannelSettings(channelName);
        },
        { once: true },
      );
    }
  };

  const handleCancelAddingChannel = () => {
    const channelElement = document.getElementById('newChannel');

    if (channelElement) {
      channelElement.classList.add('cancelAddingAnimation');
      channelElement.addEventListener(
        'animationend',
        () => {
          channelElement.classList.remove('cancelAddingAnimation');
          setAddingNewChannelState(false);
          setNewChannelName('');
          setNewChannelVolume('50');
        },
        { once: true },
      );
    }
  };

  return (
    <AccordionWrapper id="accordion">
      <React.Fragment>
        {allChannelNames &&
          allChannelNames.map((channelName, index) => (
            <AccordionItem
              key={index}
              index={index}
              activeTab={activeTab}
              setActiveTab={handleActivateTab}
              handleChange={handleChannelSettingsChange}
              handleDeleteChannel={(name) => handleDeleteChannel(name)}
              channelName={channelName}
              channelVolume={items[channelName]}
            />
          ))}
        {isAddingNewChannel ? (
          <AccordionNewSettings
            channelName={newChannelName}
            channelVolume={newChannelVolume}
            handleChange={handleChange}
            handleAddChannel={handleAddChannel}
            handleCancelAddingChannel={handleCancelAddingChannel}
          />
        ) : (
          <SVGButton center={true} onClick={handleNewChannelSettings}>
            {<AddIcon />}
          </SVGButton>
        )}
      </React.Fragment>
    </AccordionWrapper>
  );
};

export default Accordion;
