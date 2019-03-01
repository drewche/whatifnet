import React, { Component } from 'react';
import '../resources/PopChart.css';
import Chart from "react-apexcharts";
import Particles from 'react-particles-js';

class PopChart extends Component {

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
	        	type: 'category',
	        	categories: [],
	        	labels: {
	        		show: true,
	        		rotateAlways: false,
		            hideOverlappingLabels: true,
		            showDuplicates: false,
		            trim: true,
		            minHeight: undefined,
		            maxHeight: 120,
		            style: {
		                colors: [],
		                fontSize: '12px',
		                fontFamily: 'Helvetica, Arial, sans-serif',
		                cssClass: 'apexcharts-xaxis-label',
		            },
	        	}
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
		      	colors: ['#f44336', '#f21234']
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
	      ]
	    };
	}	

		componentWillMount() {
			fetch('https://www.ncdc.noaa.gov/extremes/cei/we/cei/01-12/data.json?fbclid=IwAR3VXZWo3Urcu23VppiHIfiJ9Xk_aUJOrpg0QGdPidcv4ZmvBbm7gRbwQ74')
          		.then(res => res.json())
            	.then(response => {
            		// console.log(this.state.options.title.text);
            		console.log(response);
            		console.log(response.actualPercent);
            		console.log(response.description);
            		let dat = [];
            		let cat = [];
            		let seriesName = response.description.base_period;
            		let newSeries = [{ name: seriesName, data: dat }];
            		
            		for (var key in response.actualPercent) {
            			// console.log(data.data[key]);
					    if (response.actualPercent.hasOwnProperty(key)) {
					    	cat.push(key);
					        dat.push(response.actualPercent[key]);
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
			<div className="pop-graph-component-container">
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
					                "size_min": 0.4
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
				<div className="p1">The Climate Extremes Index measures the percentage within the United States with abnormal weather conditions including severe draughts and extreme precipitation events.</div>
                <div id="chart">
                    
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      title={this.state.title}
                      type="bar"
                      width="100%"
                      height="450"
                    />
    
                </div>
                <div className="p1">The west coast alone has seen a climb in extreme climate conditions.</div>

            </div>
        );
    }
}

export default PopChart;