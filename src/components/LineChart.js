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
	          foreColor: '#333'
	        },
	        xaxis: {
	          categories: []
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
		      	text: '',
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
	          data: [],
	        }
	      ]
	    };
	}	

	componentWillMount() {
			fetch('https://www.ncdc.noaa.gov/cag/city/time-series/USW00023234-tavg-12-12-1944-2019.json?base_prd=true&begbaseyear=1948&endbaseyear=2000&fbclid=IwAR1UgsI-Dgf_8MuTRDAFe9PO7-0QRTxkkVi3iJMmOHZVi0-6y9RwqvRs15k')
          		.then(res => res.json())
            	.then(response => {
            		// console.log(this.state.options.title.text);
            		console.log(response);
            		let dat = [];
            		let cat = [];
            		let seriesName = response.description.base_period;
            		let newSeries = [{ name: seriesName, data: dat }];
            		
            		for (var key in response.data) {
            			// console.log(data.data[key]);
					    if (response.data.hasOwnProperty(key)) {
					    	cat.push(key);
					        dat.push(response.data[key].value);
					    }
					}
					console.log(dat);
					console.log(cat);
            		this.setState({
            			options: {
            				...this.state.options,
            				title: {
            					...this.state.options.title,
            					text: response.description.title
            				}
            		}});
            		this.setState({
            			options: {
            				...this.state.options,
            				xaxis: {
            					...this.state.xaxis,
            					categories: cat
            				}
            			}
            		});
            		// console.log(newSeries);
            		this.setState({
            			series: newSeries

            		});
					
            	})
            	.catch(error => console.error('Error: ', error));  
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

