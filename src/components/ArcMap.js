import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
import '../resources/ArcMap.css';

class Map extends Component {
  constructor(props) {
      super(props);
  }
  componentDidMount() {
    loadCss('https://js.arcgis.com/4.10/esri/css/main.css');

    loadModules(['esri/views/MapView', 'esri/Map'])
      .then(([MapView, Map]) => {
        
        const map = new Map({
          basemap: 'satellite'
        });

        const view = new MapView({
          map: map,
          center: [-118.71511,34.09042],
          zoom: 16,
          container: 'myGIS',
          constraints: {
            rotationEnabled: false
          },
          ui: {
            components: [ "attribution" ]
          }
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

        // view.on("double-click", function(event){
        //   event.stopPropagation();
        // });

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
        <div className="input-container">
          <div className="message-text">
          </div>
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="form-text">ENTER YOUR ADDRESS OR ZIPCODE.</Form.Label>
              <Form.Control className="form-input" placeholder="1234 Main St" />
            </Form.Group>
            <Button type="submit" className="execute" variant="dark">Execute</Button>
          </Form>
        </div>
        <div className="map-container">
          <div id="myGIS" className="arcgis-map"></div>
        </div> 
      </div>
    );
  }
}

export default Map;
