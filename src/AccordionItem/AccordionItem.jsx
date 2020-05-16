import React from 'react';

import { 
	AccordionItemWrapper, 
	ChannelSettingsLabel,
	VolumeNumberWrapper, 
	VolumeSlider 
} from "./AccordionItem.styles";
import { SVGButton } from "../Accordion/Accordion.styles";
import CloseIcon from "../utils/svg/closeIcon";

const AccordionItem = ({ 
	channelName, 
	channelVolume, 
	activeTab, 
	index, 
	activateTab, 
	handleChange,
	handleDeleteChannel
}) => {
	const isActive = (activeTab === index);

	return (
		<AccordionItemWrapper id={`channel${index}`} active={isActive}>
			<ChannelSettingsLabel>
				<button className="channelButton" onClick={() => activateTab(index)}>
					{channelName}
				</button>
				<SVGButton onClick={() => handleDeleteChannel(channelName)}>
					<CloseIcon />
				</SVGButton>
			</ChannelSettingsLabel>
			<div className='inner'>
				<div className='content'>
					<div style={{ marginTop: "-0.2em", color: "#c9c9c9" }}>Volume:</div>
					<VolumeSlider 
						type="range" 
						min="0" 
						max="100" 
						step="1" 
						id={channelName} 
						value={channelVolume} 
						onChange={handleChange} 
					/>
					<VolumeNumberWrapper>
						<input 
							type="string" 
							id={channelName} 
							value={channelVolume}
							onChange={handleChange} 
						/>
					</VolumeNumberWrapper>
				</div>
			</div>
		</AccordionItemWrapper>
	);
};

export default AccordionItem;