import React, { Component } from 'react';
import ReactMapGL, { ScaleControl, NavigationControl, Popup } from 'react-map-gl';

import LocationMarker from './LocationMarker';
import InfoWindow from './InfoWindow';

const TOKEN = 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ';

class Map extends Component {

  state = {
    settings: {
      width: '100%',
      height: '100%',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
      hillshading: true,
      rasterLayer: false,
      attributionControl: false,
      minZoom: 4
    }
  };


  render() {
    const { settings } = this.state;
    const { 
      viewport,
      onViewportChange,
      panel,
      locations, 
      marker, 
      closeInfoWindow, 
      infoWindow, 
      modal, 
      closeModal, 
      openModal, 
    } = this.props



    return (
      <ReactMapGL
        {...viewport}
        {...settings}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={TOKEN}
      >
        {/* 
          <NavigationControl />
          <ScaleControl /> 
        */}
        {locations.map(location => (
            <LocationMarker
              key={location.id}
              coordinates={[location.position.lat, location.position.lng]}
              name={location.name}
              location={location}
              marker={marker}
              panel={panel}
              eventHandler={this.props.eventHandler}
              // onClick={() => this.eventHandler(location, location.position)}
              
            >
            </LocationMarker>
          ))}

          {marker.length !== 0 && infoWindow && (
            <InfoWindow
              info={marker}
              marker={marker}
              coordinates={[marker.position.lng, marker.position.lat]}
              eventHandler={this.eventHandler}
              closeInfoWindow={closeInfoWindow}
              openModal={openModal}
            />
          )}
      </ReactMapGL>
    );
  }
}

export default Map;