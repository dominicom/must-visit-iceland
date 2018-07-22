import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import Marker from './Marker'


const InfoWindow = ({ info }) => (
  <div id="talkbubble" className="info-window">
    <h2><a>{info.name}</a></h2>
    <p>{info.title}</p>
    <button>Details</button>
    <button className="close">Close</button>
    <div id="shadow"></div>
  </div>
)



class Map extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }

  state = {
    marker: []
  }


  eventHandler = (location, pos) => {
    this.setState({ marker: location });
    this.props.eventHandler(location, pos)
  }





  render () {
    const { panel, locations, marker, openInfoWindow, infoWindow } = this.props


    return (
      <main
        className={`panel-${panel ? 'show' : 'hidden'}`}
        tabIndex="-1"
        role="application"
      >

        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDwEALhx2jYlIf__h8kulneoYOP5_F0evw',
            languages: ['en', 'is'],
            region: 'is'

          }}
          options={{ styles: this.props.style }}
          center={this.props.center}
          zoom={this.props.zoom}
        >

        {/* Populate Markers */}
        {locations.map(location => (
          <Marker
            key={location.id}
            lat={location.position.lat}
            lng={location.position.lng}
            name={location.name}
            location={location}
            eventHandler={this.eventHandler}
          />
        ))}



        {/* InfoWindow appears when marker is clicked and disapears after filter results */}
        {marker.length !== 0 && infoWindow && (
          <InfoWindow
            info={marker}
            lat={marker.position.lat}
            lng={marker.position.lng}
            // name={location.name}
          />

        )}
        {/* {openInfoWindow(
          <InfoWindow
            info={marker}
            lat={marker.position.lat}
            lng={marker.position.lng}
            // name={location.name}
          />

        )} */}

        </GoogleMapReact>
      </main>
    );
  }
}

export default Map;
