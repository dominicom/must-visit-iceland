import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import { Map, ZoomControl, Tooltip, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet'

// import Marker from './Marker';
import InfoWindow from './InfoWindow';
import DetailsPage from './DetailsPage';

import './Map.css';

// https://github.com/rakunn/neighborhood-map
// @live https://rakunn.github.io/neighborhood-map/

class MainContainer extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }


  eventHandler = (location, pos) => {
    // this.setState({ marker: location });
    this.props.eventHandler(location, pos)
  }

  // This function draws error message window below header when some data are not loaded
  drawError = (map, wiki, flickr) => {
    return (
      <div>
      <span>Please refresh app! Something went wrong because of error(s):</span>
      <ol>
          {map    ? null :  ( <li>ERROR: There was a problem with loading Google Maps!</li>)}
          {wiki   ? null :  ( <li>ERROR: There was a problem with fetching data from Wikipedia!</li>)}
          {flickr ? null :  ( <li>ERROR: There was a problem with fetching images from Flickr!</li>)}
      </ol>
      </div>
    )
  }




  render () {

    const { panel, locations, marker, closeInfoWindow, infoWindow, modal, closeModal, openModal, isLoaded } = this.props

    console.log(infoWindow, modal)

    return (
      <main
        id="map"
        className={`panel-${panel ? 'show' : 'hidden'}`}>

        {modal && (
          <DetailsPage
            marker={marker}
            modal={modal}
            closeModal={closeModal}
          />
        )}  

        <Map 
          zoomControl={false}
          attributionControl={false}
          style={{ height: `100%` }}
          viewport={{
            center: this.props.center,
            zoom: this.props.zoom
          }}
          onClick={() => console.log("klołs eny popap!")}
        >
          <ZoomControl position="topright" />
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />


          {locations.map(location => (
              <Marker
                key={location.id}
                position={[location.position.lat, location.position.lng]}
                name={location.name}
                location={location}
                marker={marker}
                panel={panel}
                onClick={() => this.eventHandler(location, location.position)}
              >
                <Tooltip>{location.name}</Tooltip>
              </Marker>
          ))}

          {marker.length !== 0 && infoWindow && (
            <InfoWindow
              info={marker}
              position={[marker.position.lat, marker.position.lng]}
              eventHandler={this.eventHandler}
              closeInfoWindow={closeInfoWindow}
              openModal={openModal}
            />
          )}
        </Map>


        {/* Error handling notification message */}

        {/* {isLoaded.map && isLoaded.wiki && isLoaded.flickr
          ? null
          : (
              <div className="error">
                {this.drawError(isLoaded.map, isLoaded.wiki, isLoaded.flickr)}
              </div>
          )} */}

      </main>
    );
  }
}

export default MainContainer;
