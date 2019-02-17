import React, { Component } from 'react';
import '../resources/PopChart.css';
import Chart from "react-apexcharts";

class PopChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      options: {
	        chart: {
	          height: 450,
	          width: "100%",
	          id: "basic-bar",
	          background: '#f4f4f4',
	          foreColor: '#333'
	        },
	        xaxis: {
	          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
	        },
	        plotOptions: {
		      	bar: {
		      		horizontal: false
		      	}
		      },
		      fill: {
		      	colors: ['#f44336', '#f21234']
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
	          name: "series",
	          data: [30, 40, 45, 50, 49, 60, 70, 91],
	        },
	        {
	          name: "seriess",
	          data: [30, 100, 432, 350, 49, 60, 70, 91]
	        }
	      ]
	    };
	}	
		onClick = () => {
			this.setState({
				options: {
					...this.state.options,
					plotOptions: {
						...this.state.options.plotOptions,
						bar: {
							...this.state.options.plotOptions.bar,
							horizontal: !this.state.options.plotOptions.bar.horizontal
						}
					}
				}
			})
		}

	render() {
		return (
			<div className="pop-graph-component-container">
				<div id="chart">
					
					<Chart
		              options={this.state.options}
		              series={this.state.series}
		              title={this.state.title}
		              type="bar"
		              width="100%"
		              height="450"
		            />
		            <button onClick={this.onClick}>Toggle</button>
					
				</div>
			</div>
		);
	}
}

export default PopChart;

