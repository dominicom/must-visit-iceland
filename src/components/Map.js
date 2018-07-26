import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import Marker from './Marker'
import InfoWindow from './InfoWindow'
import DetailsPage from './DetailsPage'





class Map extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }

  state = {
    //marker: []
  }


  eventHandler = (location, pos) => {
    this.setState({ marker: location });
    this.props.eventHandler(location, pos)
  }





  render () {

    const { panel, locations, marker, openInfoWindow, closeInfoWindow, infoWindow, modal, closeModal, openModal } = this.props

    return (
      <main
        className={`panel-${panel ? 'show' : 'hidden'}`}>

        <DetailsPage
          panel={panel}
          marker={marker}
          locations={locations}
          modal={modal}
          closeModal={closeModal}
        />
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDwEALhx2jYlIf__h8kulneoYOP5_F0evw',
            languages: ['en', 'is'],
            region: 'is'
            // TODO add something extra???
          }}
          options={{ styles: this.props.style,
                     scrollwheel: true
          }}
          center={this.props.center}
          zoom={this.props.zoom}
          tabIndex={panel ? 0 : -1}
          role="application"
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
            marker={marker}
            panel={panel}
          />
        ))}



        {/* InfoWindow appears when marker is clicked and disapears after filter results */}
        {marker.length !== 0 && infoWindow && (
          <InfoWindow
            info={marker}
            lat={marker.position.lat}
            lng={marker.position.lng}
            eventHandler={this.eventHandler}
            closeInfoWindow={closeInfoWindow}
            openModal={openModal}
          />

        )}

        </GoogleMapReact>

      </main>
    );
  }
}

export default Map;
