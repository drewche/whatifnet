import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Particles from 'react-particles-js';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
import '../resources/ArcMap.css';

class Map extends Component {
  constructor(props) {
      super(props);
      this.state = {
        binary: '',
        image: ''
      }
  }


  componentDidMount() {
    loadCss('https://js.arcgis.com/4.10/esri/css/main.css');

    loadModules(['esri/views/MapView', 'esri/Map', 'esri/widgets/Search'])
      .then(([MapView, Map, Search]) => {
        
        const map = new Map({
          basemap: 'satellite'
        });

        const view = new MapView({
          map: map,
          center: [-118.71511,34.09042],
          zoom: 18,
          container: 'myGIS',
          constraints: {
            rotationEnabled: false
          },
          ui: {
            components: [ "attribution" ]
          }
        });

        const searchWidget = new Search({
          view: view,
          container: 'searchContainer',
          suggestionsEnabled: false,
          autoSelect: true,
          popupEnabled: false,
          popupTemplate: false,
          allPlaceholder: '1234 Main Street',
        });


        //view.on("click", function(event){
         // Sets the center point of the view at a specified lon/lat
          //view.zoom = 16;  // Sets the zoom LOD to 13
          // Set the extent on the view
          
        //});

        
        searchWidget.on("select-result", (e) => {
          view.zoom = 18;
          let long = e.result.feature.geometry.longitude;
          let lat = e.result.feature.geometry.latitude;
          view.center = [long, lat];
          console.log("Latitude: " + lat);
          console.log("Longitude: " + long);
          fetch('http://35.236.7.193:3000/model', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'no-cors'
            },
            body: JSON.stringify({ 
              "lat": lat,
              "long": long
            })
          }).then(res => res.text()).then(text => {
            console.log('data:image/png;base64,' + text);
            this.setState({ image: 'data:image/png;base64,' + text });
          })
        });
          

        view.on("key-down", function(event){
          var prohibitedKeys = [ "+", "-", "Shift", "_", "=" ];
          var keyPressed = event.key;
          if(prohibitedKeys.indexOf(keyPressed) !== -1){
            event.stopPropagation();
          }
        });

        view.on("mouse-wheel", function(event){
          event.stopPropagation();
        });

        view.on("double-click", function(event){
          event.stopPropagation();
        });

        view.on("double-click", ["Control"], function(event){
          event.stopPropagation();
        });


        view.on("drag", ["Shift"], function(event){
          event.stopPropagation();
        });

        view.on("drag", ["Shift", "Control"], function(event){
          event.stopPropagation();
        });

        //*** Add div element to show coordates ***//
        let coordsWidget = document.createElement("div");
        coordsWidget.id = "coordsWidget";
        coordsWidget.className = "esri-widget esri-component";
        coordsWidget.style.padding = "7px 15px 5px";
        view.ui.add(coordsWidget, "bottom-right");


        //*** Update lat, lon, zoom and scale ***//
        function showCoordinates(pt) {
          var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) + 
              " | Scale 1:" + Math.round(view.scale * 1) / 1 +
              " | Zoom " + view.zoom;
          coordsWidget.innerHTML = coords;
        }
        
        //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
        view.watch(["stationary"], function() {
          showCoordinates(view.center);
        });

        //*** Add event to show mouse coordinates on click and move ***//
        view.on(["pointer-down","pointer-move"], function(evt) {
          showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
        });

        });
  }

  render() {
    return (
      <div className="map-component-container">
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
        <div id="inputContainer" className="input-container"> 
          <div className="message-text">Enter your address, find your home, and see the future if we do not act now.</div>
          <div className="bottom"> 
            <div id="searchContainer" name="search-container"></div>
            <Button className="applyFilter" variant="flat">What if...</Button>
          </div>
        </div>
        <div className="image-container">
          <div className="map-container">
            <div id="myGIS" className="arcgis-map"></div>
          </div>
          <img className="myImage" src={this.state.image}/>
        </div>
      </div>
    );
  }
}

export default Map;
