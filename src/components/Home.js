import React, { Component } from 'react';
// https://www.npmjs.com/package/react-typing-animation
import Typing from 'react-typing-animation';
import '../resources/Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		fetch('https://us-central1-whatifnet.cloudfunctions.net/helloWorld')
			.then(response => response.json())
			.then(data => console.log(data))
	}

	render() {
		return (
			<div className={this.props.color}>
				<div className="message"><Typing><span>{this.props.message}</span></Typing></div>
				<i className="fas fa-arrow-down "></i>
			</div>
		);
	}

}

export default Home;