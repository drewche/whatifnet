import React, { Component } from 'react';
import './resources/App.css';
import Home from './components/Home.js';
import ArcMap from './components/ArcMap.js';
import Results from './components/Results.js'

class App extends Component {
  constructor(props) {
      super(props);
        this.section1 = React.createRef();
        this.section2 = React.createRef();
        this.scrollToContent = this.scrollToContent.bind(this);
  }
  scrollToContent(content) {
    switch(content) {
      case 1:
        this.section1.current.scrollIntoView({behavior: 'smooth'});
        break;
      case 2:
        this.section2.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  render() {
    return (
      <div className="fullscreen">
        <Home onclick={this.scrollToContent} message="What if... global warming was at your doorstep?"
              color="black"/>
        <ArcMap ref={this.section1} />
        <Results ref={this.section2} />
      </div>
    );
  }
}

export default App;
