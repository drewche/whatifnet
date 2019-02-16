import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
        <div className="map-container">
          <div id="myGIS" className="arcgis-map"></div>
        </div>  
        <Button className="select" variant="dark">Grab Information</Button>
      </div>
    );
  }
}

export default Map;
