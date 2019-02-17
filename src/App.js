import React, { Component } from 'react';
import './resources/App.css';
import Home from './components/Home.js';
import ArcMap from './components/ArcMap.js';
import Results from './components/Results.js'
import LineGraph from './components/LineGraph.js'

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="fullscreen">
        <Home message="What if... global warming was at your doorstep?"
              color="black"/>
        <ArcMap />  
        <Results />
      </div>
    );
  }
}

export default App;
