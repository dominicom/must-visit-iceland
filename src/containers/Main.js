import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapboxGl, { 
  ZoomControl, 
  ScaleControl 
} from 'react-mapbox-gl';

import LocationMarker from '../components/LocationMarker';
import InfoWindow from '../components/InfoWindow';
import DetailsPage from './DetailsPage';

import './Main.css';

// https://github.com/rakunn/neighborhood-map
// @live https://rakunn.github.io/neighborhood-map/

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ',
  attributionControl: false,
});

class MainContainer extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }
  constructor() {
    super();
    this.state = {
      viewport: {
        latitude: 51,
        longitude: 0,
        zoom: 7,
        bearing: 0,
        pitch: 0,
        maxZoom: 20
      },
      // position: null,
      // mapStyle: maps.streets
    };
  }

  componentDidMount () {
    console.log(this.props.center)
  }



  eventHandler = (location, pos) => {
    // this.setState({ marker: location });
    this.props.eventHandler(location, pos)
  }

  // This function draws error message window below header when some data are not loaded
  drawError = (connection, wiki, flickr) => {
    return (
      <div>
        <span>Please refresh app! Something went wrong because of error(s):</span>
        <ol>
            {connection && ( <li>ERROR: You are offline!</li>)}
            {wiki       && ( <li>ERROR: There was a problem with fetching data from Wikipedia!</li>)}
            {flickr     && ( <li>ERROR: There was a problem with fetching images from Flickr!</li>)}
        </ol>
      </div>
    )
  }





  render () {

    const { 
      panel, 
      center,
      locations, 
      marker, 
      closeInfoWindow, 
      infoWindow, 
      modal, 
      closeModal, 
      openModal, 
      isError 
    } = this.props

    console.log(center)

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
          // zoomControl={false}
          
          containerStyle={{ width: '100%', height: '100%' }}
          style="mapbox://styles/mapbox/streets-v8"
          // style={{ height: `100%` }}
          center={center}
          // center={[this.props.center.lat, -this.props.center.lng]}
          // viewport={this.state.viewport}
          // scrollWheelZoom={infoWindow ? "center" : "true"}
          zoom={[this.props.zoom]}
        >
          
          <ZoomControl position="topright" />
          <ScaleControl />

          {/* <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" /> */}


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
              {/* {marker.id !== location.id && <Tooltip direction="right">{location.name}</Tooltip>} */}
            </LocationMarker>
          ))}

          {marker.length !== 0 && infoWindow && (
            <InfoWindow
              info={marker}
              coordinates={[marker.position.lng, marker.position.lat]}
              eventHandler={this.eventHandler}
              closeInfoWindow={closeInfoWindow}
              openModal={openModal}
            />
          )}
        </Map>


        {/* Error handling notification message */}

        {isError.connection && isError.wiki && isError.flickr && (
          <div className="error">
            {this.drawError(isError.connection, isError.wiki, isError.flickr)}
          </div>
        )}

      </main>
    );
  }
}

export default MainContainer;
