import React, { Component } from 'react';
import '../resources/LineChart.css';
import Chart from "react-apexcharts";

class LineChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      options: {
	        chart: {
	          height: 450,
	          width: "100%",
	          id: "basic-bar",
	          background: '#f4f4f4',
	          foreColor: '#333',

	        },
	        xaxis: {
	          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
	        },
			fill: {
				type: 'gradient',
			    gradient: {
			      shadeIntensity: 1,
			      opacityFrom: 0.7,
			      opacityTo: 0.9,
			      stops: [0, 90, 100]
			    }
			},
			title: {
				text: 'Largest US Cities By Population',
				align: 'center',
				margin: 20,
				offsetY: 20,
				style: {
					fontSize: '25px',
					color: '#263238'
				},
			}
	      },
	      series: [
	        {
	          name: "series-1",
	          data: [30, 40, 45, 50, 49, 60, 70, 91],
	        },
	        {
	          name: "series-2",
	          data: [30, 100, 432, 350, 49, 60, 70, 91]
	        }
	      ]
	    };
	}	

	render() {
		return (
			<div className="line-graph-component-container">
				<div id="chart">
					
					<Chart
		              options={this.state.options}
		              series={this.state.series}
		              title={this.state.title}
		              type="area"
		              width="100%"
		              height="450"
		            />
					
				</div>
			</div>
		);
	}
}

export default LineChart;

