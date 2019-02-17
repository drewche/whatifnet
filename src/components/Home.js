import React, { Component } from 'react';
// https://www.npmjs.com/package/react-typing-animation
import Typing from 'react-typing-animation';
import { Button } from 'react-bootstrap';
import Particles from 'react-particles-js';
import '../resources/Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="home-component-container">
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

				<div className="message"><Typing><span>{this.props.message}</span></Typing></div>
				<Button className="select" variant="dark">Learn More</Button>
				<i className="fas fa-arrow-down "></i>
			</div>
		);
	}

}

export default Home;