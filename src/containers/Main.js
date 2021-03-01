import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Map from '../components/Map';
import DetailsPage from './DetailsPage';

import './Main.css';



// https://github.com/rakunn/neighborhood-map
// @live https://rakunn.github.io/neighborhood-map/

// const Map = ReactMapboxGl({
//   accessToken: 'pk.eyJ1IjoiZG9taW5pY29tIiwiYSI6ImNqaWJ1djgxZjFtMXMzcGxndjVtY2kwNTcifQ.mSBj4uB0ilknv9tWABt8fQ',
//   attributionControl: false,
// });

class MainContainer extends Component {
  static propTypes = {
    panel: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 64,
        longitude: -20,
        zoom: 6,
        bearing: 0,
        pitch: 0,
        maxZoom: 20,
        width: 400,
        height: 400,
      },
    };
  }

  componentDidMount () {
    console.log(this.props.center)
    console.log("👌 mounted!")
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
      viewport,
      onViewportChange,
      eventHandler,
      panel,
      locations, 
      marker, 
      closeInfoWindow, 
      infoWindow, 
      modal, 
      closeModal, 
      openModal, 
      isError 
    } = this.props

    // console.log(center)

    return (
      <main
        id="map"
        className={`main-container panel-${panel ? 'show' : 'hidden'}`}
      >

        {modal && (
          <DetailsPage
            marker={marker}
            modal={modal}
            closeModal={closeModal}
          />
        )}  

        <Map
          locations={locations}
          marker={marker}
          viewport={viewport}
          onViewportChange={onViewportChange}
          eventHandler={eventHandler}
          closeInfoWindow={closeInfoWindow}
          infoWindow={infoWindow}
          openModal={openModal}
        />
          
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
