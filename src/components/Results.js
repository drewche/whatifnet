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
				<div className="message">
					<Typing speed={100}>
						<div>Temperatures are rising everywhere, even in your own backyard.</div>
						<div>Find out what your home will look like when climate change related catastrophe comes knocking.</div>
					</Typing>
				</div>
			</div>
		);
	}
}

export default Results;