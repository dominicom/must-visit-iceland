
import React from 'react';
import { Popup, Image } from 'react-mapbox-gl';
// import { Popup } from 'react-leaflet';
import * as FocusTrap from '../utils/FocusTrap';

import './InfoWindow.css';



const overrideStyle = {
  popup: {
    bottom: 10
  }
}


const InfoWindow = ({ info, infoWindow, closeInfoWindow, openModal, coordinates }) => {
    console.log("InfoWindow, marker:", info, infoWindow);
    return (
      <Popup 
        minWidth={400}
        coordinates={coordinates} 
        offset={[0, -45]}
        onClose={() => closeInfoWindow()}
      >

        
        <div id="talkbubble" className="info-window">
          
          <h4>{info.altname ? info.altname : `${info.title} ${info.category[0]}`}</h4>
          <h2>{info.name}</h2>
          <button className="close" onClick={(event) => closeInfoWindow()}>Close</button>

          <img src={info.photos[0]} width={200} />

          <button className="details-button"
                  onClick={() => {
                    openModal();
                    FocusTrap.onFocus(); // FOCUS TRAP function to set focus on modal window of location details, <DetailsPage/> Component
                  }}>Details</button>


          

          {/* <div id="triangle"></div> */}
          
        </div>
      </Popup>
    );
  }


export default InfoWindow;
