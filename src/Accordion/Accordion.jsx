import React from 'react';

import { AccordionWrapper, SVGButton } from "./Accordion.styles";
import AccordionNewSettings from "../AccordionItem/AccordionNewSettings";
import AccordionItem from "../AccordionItem/AccordionItem";
import AddIcon from "../utils/svg/addIcon.jsx";
import scrollToElement from "../utils/scroll";

class Accordion extends React.Component {
  state = {
		activeTab: 0,
		addingNewChannel: false,
		newChannelName: "",
		newChannelVolume: "50"
	};

	handleChange = event => {
    const path = event.target.id;
		let value = event.target.value;
		if (path === "newChannelVolume") {
			const volumeInt = parseInt(value, 10);
			if (volumeInt < 0 || isNaN(volumeInt)) {
				value = 0;
			} else if (volumeInt > 100) {
				value = 100;
			} else {
				value = volumeInt;
			}
		}

		this.setState({ [path]: value.toString() });
	};

	handleActivateTab = (index) => {
		const { activeTab } = this.state;
		const newActiveTab = activeTab === index ? -1 : index;
		this.setState(({ activeTab: newActiveTab }));
		if (this.state.addingNewChannel) {
			this.handleCancelAddingChannel();
		}

		if (newActiveTab !== -1) {
			scrollToElement(`channel${newActiveTab}`, newActiveTab);
		}
	};

	handleNewChannelSettings = () => {
		const notAIndex = -1;
		this.setState({ activeTab: notAIndex, addingNewChannel: true }, () => {
			const newChannelElement = document.getElementById("newChannel");
			newChannelElement.classList.add("addAnimation");
			newChannelElement.addEventListener("animationend", () => {
				newChannelElement.classList.remove("addAnimation");
				scrollToElement("newChannel");
			}, { once: true });
		});
	};

	handleAddChannel = () => {
		const { items, addChannelSettings } = this.props;
		const channelName = this.state.newChannelName;
		const channelVolume = this.state.newChannelVolume;
		const channelIndex = items && Object.keys(items).length || 0;

		if (channelName && channelVolume) {
			addChannelSettings(channelName, channelVolume);
			this.setState({ 
				activeTab: channelIndex,
				addingNewChannel: false, 
				newChannelName: "", 
				newChannelVolume: "50"
			}, () => {
				scrollToElement(`channel${channelIndex}`);
			});
		}
	};

	handleDeleteChannel = (channelName) => {
		const { activeTab } = this.state;
		const { items, removeChannelSettings } = this.props;
		const channelIndex = Object.keys(items).indexOf(channelName);
		const channelElement = document.getElementById(`channel${channelIndex}`);
		if (channelIndex <= activeTab) {
			this.setState({ activeTab: activeTab - 1 });
		}
		channelElement.style.animation = (channelIndex === activeTab)
			? "removeItemActive .3s"
			: "removeItemNotActive .3s";
		channelElement.addEventListener("animationend", () => {
			channelElement.style.animation = "";
			removeChannelSettings(channelName);
		}, { once: true });
	};

	handleCancelAddingChannel = () => {
		const channelElement = document.getElementById("newChannel");
		channelElement.classList.add("cancelAddingAnimation");
		channelElement.addEventListener("animationend", () => {
			channelElement.classList.remove("cancelAddingAnimation");
			this.setState({
				addingNewChannel: false,
				newChannelName: "",
				newChannelVolume: "50"
			});
		}, { once: true });
	};

	render() {
		const { 
			items, 
			handleChange
		} = this.props;
		const { 
			activeTab, 
			addingNewChannel, 
			newChannelName, 
			newChannelVolume
		} = this.state;
		const allChannelNames = items && Object.keys(items);

		return (
			<AccordionWrapper id="accordion">
				<React.Fragment>
					{allChannelNames && allChannelNames.map((channelName, index) =>
						<AccordionItem
							key={index}
							index={index}
							activeTab={activeTab}
							activateTab={this.handleActivateTab}
							handleChange={handleChange}
							handleDeleteChannel={(name) => this.handleDeleteChannel(name)}
							channelName={channelName}
							channelVolume={items[channelName]}
						/>
					)}
					{addingNewChannel ? (
						<AccordionNewSettings 
							channelName={newChannelName}
							channelVolume={newChannelVolume} 
							activateTab={this.handleActivateTab}
							handleChange={this.handleChange}
							handleAddChannel={this.handleAddChannel}
							handleCancelAddingChannel={this.handleCancelAddingChannel}
						/>
					) : (
						<SVGButton center={true} onClick={this.handleNewChannelSettings}>
							{<AddIcon />}
						</SVGButton>
					)}
				</React.Fragment>
			</AccordionWrapper>
		);
	};
};

export default Accordion;