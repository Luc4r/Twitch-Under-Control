import React, { Component } from "react";

import "./App.css";
import TopBar from "./TopBar/TopBar";
import Footer from "./Footer/Footer";
import Accordion from "./Accordion/Accordion";
import { saveToChrome, getFromChrome } from "./utils/chromeStorage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundSettings: null
    };
  };

  componentDidMount() {
    getFromChrome("soundSettings", (storeSoundData) => { 
      if (storeSoundData && storeSoundData !== this.state.soundSettings) {
        this.setState({ soundSettings: storeSoundData });
      }
    });
  };

  componentDidUpdate() {
    saveToChrome("soundSettings", this.state.soundSettings);
  };

  getCorrectVolumeNumber = (volume) => {
    const volumeInt = parseInt(volume, 10);
    if (volumeInt < 0 || isNaN(volumeInt)) {
      return 0;
    } else if (volumeInt > 100) {
      return 100;
    } else {
      return volumeInt;
    }
  };

  modifyChannelSettings = (channelName, volume) => {
    const newSoundSettings = {...this.state.soundSettings};
    const volumeInt = this.getCorrectVolumeNumber(volume);
    newSoundSettings[channelName] = volumeInt.toString();
    this.setState({ soundSettings: newSoundSettings });
  };

  removeChannelSettings = channelToRemove => {
    const { 
      [channelToRemove]: dataLost, 
      ...newSoundSettings 
    } = this.state.soundSettings;
    this.setState({ soundSettings: newSoundSettings });
  };

  handleChange = event => {
    const channelName = event.target.id;
    const volume = event.target.value;
    const newVolume = this.getCorrectVolumeNumber(volume);
    this.modifyChannelSettings(channelName, newVolume);
  };

  render() {
    const { soundSettings } = this.state;

    return (
      <div className="App">
        <TopBar />
        <Accordion 
          items={soundSettings} 
          handleChange={this.handleChange} 
          addChannelSettings={this.modifyChannelSettings} 
          removeChannelSettings={this.removeChannelSettings} 
        />
        <Footer />
      </div>
    );
  };
};

export default App;
