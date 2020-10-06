import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

import LocationMarker from './LocationMarker';
import InfoWindow from './InfoWindow';

const TOKEN = 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ';

class Map extends Component {

  state = {
    viewport: {
      latitude: 64,
      longitude: -20,
      zoom: 2
    },
    settings: {
      width: '100%',
      height: '100%',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11'
    }
  };

  render() {
    const { settings } = this.state;
    const { 
      viewport,
      onViewportChange,
      panel, 
      center,
      zoom,
      locations, 
      marker, 
      closeInfoWindow, 
      infoWindow, 
      modal, 
      closeModal, 
      openModal, 
      isError 
    } = this.props
    return (
      <ReactMapGL
        {...this.state.viewport}
        {...settings}
        onViewportChange={(viewport) => this.setState({viewport})}
        // onViewportChange={this.props.onViewportChange(viewport)}
        mapboxApiAccessToken={TOKEN}
      >
        {locations.map(location => (
            <LocationMarker
              key={location.id}
              coordinates={[location.position.lng, location.position.lat]}
              name={location.name}
              location={location}
              marker={marker}
              panel={panel}
              eventHandler={this.props.eventHandler}
              // onClick={() => this.eventHandler(location, location.position)}
              
            >
            </LocationMarker>
          ))}
      </ReactMapGL>
    );
  }
}

export default Map;