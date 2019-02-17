import React, { Component } from 'react';
import '../resources/LineChart.css';
import Chart from "react-apexcharts";
import Particles from 'react-particles-js';

class LineChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      options: {
	        chart: {
	          height: 450,
	          width: "100%",
	          id: "basic-bar",
	          background: 'rgba(200, 200, 200, 0.2)',
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
		    dataLabels: {
	      		enabled: false
	      	},
			fill: {
				colors: ['#FFFFFF', 'red']
			},
			title: {
				text: '',
				align: 'center',
				margin: 20,
				offsetY: 20,
				style: {
					fontSize: '25px',
					color: '#FFFFFF'
				},
			}
	      },
	      series: [
	        {
	          name: "series",
	          data: [],
	        }
	      ],
	      subtitle: {
		    text: "Hello",
		    align: 'left',
		    margin: 10,
		    offsetX: 0,
		    offsetY: 0,
		    floating: false,
		    style: {
		      fontSize: '14px',
		      color: '#9699a2'
		    },
		}
	    };
	}	

	componentWillMount() {
			fetch('https://www.ncdc.noaa.gov/cag/city/time-series/USW00023234-tavg-12-12-1944-2019.json?base_prd=true&begbaseyear=1948&endbaseyear=2000&fbclid=IwAR1UgsI-Dgf_8MuTRDAFe9PO7-0QRTxkkVi3iJMmOHZVi0-6y9RwqvRs15k')
          		.then(res => res.json())
            	.then(response => {
            		// console.log(this.state.options.title.text);
            		//console.log(response);
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
					//console.log(dat);
					//console.log(cat);
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
				<Particles 
					className="particles"
					params={{
					    "particles": {
					        "number": {
					            "value": 100,
					            "density": {
					                "enable": false
					            }
					        },
					        "color": {
					        	"value": "#ff0000"
					        },
					        "size": {
					            "value": 3,
					            "random": true,
					            "anim": {
					                "speed": 4,
					                "size_min": 0.3
					            }
					        },
					        "line_linked": {
					            "enable": true,
					            "color" : "#ff8c00"
					        },
					        "move": {
					            "random": true,
					            "speed": 1,
					            "direction": "top",
					            "out_mode": "out"
					        }
					    },
					    "interactivity": {
					        "events": {
					            "onhover": {
					                "enable": true,
					                "mode": "bubble"
					            },
					            "onclick": {
					                "enable": true,
					                "mode": "repulse"
					            }
					        },
					        "modes": {
					            "bubble": {
					                "distance": 250,
					                "duration": 2,
					                "size": 0,
					                "opacity": 0
					            },
					            "repulse": {
					                "distance": 400,
					                "duration": 4
					            }
					        }
					    }
					}} />
				<div id="chart">
					
					<Chart
		              options={this.state.options}
		              series={this.state.series}
		              title={this.state.title}
		              subtitle={this.state.subtitle}
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

