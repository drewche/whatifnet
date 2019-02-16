import React, { Component } from 'react';
import './resources/App.css';
import Home from './components/Home.js';
import ArcMap from './components/ArcMap.js';
import Results from './components/Results.js'

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="fullscreen">
        <Home message="What if... global warming was at your doorstep?"
              color="black"/>
        <ArcMap ref={this.section1} />
        <Results ref={this.section2} />
      </div>
    );
  }
}

export default App;
