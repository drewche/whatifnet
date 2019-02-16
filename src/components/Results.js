import React, { Component } from 'react';
// https://www.npmjs.com/package/react-typing-animation
import Typing from 'react-typing-animation';
import '../resources/Results.css';

class Results extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="results-component-container">
				<div className="message"><Typing><span>Global warming in your neighborhood.</span></Typing></div>
			</div>
		);
	}
}

export default Results;