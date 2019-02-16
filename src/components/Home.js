import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.props.color}>{this.props.message}</div>
		);
	}

}

export default Home;