import { ChangeEvent, useEffect, useState } from 'react';

import { AppWrapper } from './App.styles';
import TopBar from './TopBar/TopBar';
import Footer from './Footer/Footer';
import Accordion from './Accordion/Accordion';
import { saveToChrome, getFromChrome } from './utils/chromeStorage';
import { SoundSetting } from './utils/commonTypes';

const App = () => {
  const [soundSettings, setSoundSettings] = useState<SoundSetting | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storeSoundData = await getFromChrome<SoundSetting>('soundSettings');

      if (storeSoundData && storeSoundData !== soundSettings) {
        setSoundSettings(storeSoundData);
      }
    };

    fetchData();
  }, []);

  const getCorrectVolumeNumber = (volume: string) => {
    const volumeInt = parseInt(volume, 10);
    if (volumeInt < 0 || isNaN(volumeInt)) {
      return 0;
    } else if (volumeInt > 100) {
      return 100;
    } else {
      return volumeInt;
    }
  };

  const modifyChannelSettings = (
    channelNameToModify: string,
    volume: string,
  ) => {
    const newSoundSettings = { ...soundSettings };
    const volumeInt = getCorrectVolumeNumber(volume);

    newSoundSettings[channelNameToModify] = volumeInt.toString();
    setSoundSettings(newSoundSettings);
    saveToChrome('soundSettings', newSoundSettings);
  };

  const removeChannelSettings = (channelNameToRemove: string) => {
    if (soundSettings) {
      const { [channelNameToRemove]: dataLost, ...newSoundSettings } =
        soundSettings;

      setSoundSettings(newSoundSettings);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const channelName = event.target.id;
    const newVolume = event.target.value;

    modifyChannelSettings(channelName, newVolume);
  };

  return (
    <AppWrapper>
      <TopBar />
      <Accordion
        items={soundSettings || {}}
        handleChannelSettingsChange={handleChange}
        addChannelSettings={modifyChannelSettings}
        removeChannelSettings={removeChannelSettings}
      />
      <Footer />
    </AppWrapper>
  );
};

export default App;
