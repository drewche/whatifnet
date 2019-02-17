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
				<div className="message"><Typing><div>Global warming in your neighborhood.</div><div>Look below to transform your home.</div></Typing></div>
			</div>
		);
	}
}

export default Results;