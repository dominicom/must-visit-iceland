
import React from 'react';
import { Popup } from 'react-leaflet';
import * as FocusTrap from '../utils/FocusTrap';

import './InfoWindow.css';



const overrideStyle = {
  popup: {
    bottom: 10
  }
}


const InfoWindow = ({ info, infoWindow, closeInfoWindow, openModal, position }) => {
    console.log("InfoWindow, marker:", info, infoWindow);
    return (
      <Popup 
        minWidth={400}
        position={position} 
        offset={[0, -30]}
        onClose={() => closeInfoWindow()}
      >

      
        {/* <div id="talkbubble" className="info-window"> */}
          
          <h4>{info.altname ? info.altname : `${info.title} ${info.category[0]}`}</h4>
          <h2>{info.name}</h2>


          <button className="details-button"
                  onClick={() => {
                    openModal();
                    FocusTrap.onFocus(); // FOCUS TRAP function to set focus on modal window of location details, <DetailsPage/> Component
                  }}>Details</button>


          {/* <button className="close" onClick={(event) => closeInfoWindow()}>Close</button> */}

          {/* <div id="triangle"></div> */}
          
        {/* </div> */}
      </Popup>
    );
  }


export default InfoWindow;
