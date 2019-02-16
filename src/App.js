import React, { Component } from 'react';
import './resources/App.css';
import Home from './components/Home.js';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    
    return (
      <div className="fullscreen">
        <Home message="What if... global warming was at your doorstep?"
              color="black"/>
        <Home message="Bye!"
              color="red"/>
        <Button variant="secondary">Secondary</Button>
      </div>
    );
  }
}

export default App;
