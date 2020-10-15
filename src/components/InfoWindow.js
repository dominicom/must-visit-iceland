
import React from 'react';
import { Popup } from 'react-map-gl';
// import { Popup } from 'react-leaflet';
import * as FocusTrap from '../utils/FocusTrap';

import Button from './Button';
import CloseButton from './CloseButton';

import './InfoWindow.css';


const InfoWindow = ({ marker, info, infoWindow, closeInfoWindow, openModal, coordinates }) => {
    console.log("InfoWindow, marker:", info, infoWindow);
    return (
      <Popup 
        tipSize={8}
        anchor="top"
        longitude={marker.position.lng}
        latitude={marker.position.lat}
      >

        
        <div className="info-window">
          <div className="info-window-header">
            <h4>{info.altname ? info.altname : `${info.title} ${info.category[0]}`}</h4>
            <h2>{info.name}</h2>
          </div>

          <div 
            className="info-window-thumbnail"
            style={{ backgroundImage: `url(${info.photos[0]})` }}
            role="img"
          />
          
          <div className="info-window-action-panel">
            <Button 
              type="primary"
              onClick={() => {
                openModal();
                FocusTrap.onFocus(); // FOCUS TRAP function to set focus on modal window of location details, <DetailsPage/> Component
              }}
              label="Details"
              ariaLabel="Close window"
            />
          </div>

          <CloseButton onClick={() => closeInfoWindow()} />
        </div>
      </Popup>
    );
  }


export default InfoWindow;
