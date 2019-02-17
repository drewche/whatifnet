import React, { Component } from 'react';
import '../resources/Dashboard.css';
import LineChart from "./LineChart.js";
import PopChart from "./PopChart.js";


class Dashboard extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard-component-container">
				<PopChart />
				<LineChart />
			</div>
		);
	}
}

export default Dashboard;

