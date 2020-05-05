import React from "react";

import { AccordionWrapper } from "./Accordion.styles";

class Accordion extends React.Component {
  state = {
		activeTab: 0
	};

	render() {
		const { 
			items, 
			handleChange, 
			addChannelSettings, 
			removeChannelSettings 
		} = this.props;
		const { activeTab	} = this.state;
		const allChannelNames = items && Object.keys(items);

		return (
			<AccordionWrapper id="accordion" role="tablist">
				<p>Accordion placeholder...</p>
			</AccordionWrapper>
		);
	};
};

export default Accordion;