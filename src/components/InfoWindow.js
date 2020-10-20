
import React from 'react';
import { Popup } from 'react-map-gl';
// import { Popup } from 'react-leaflet';
import * as FocusTrap from '../utils/FocusTrap';

import Button from './Button';
import CloseButton from './CloseButton';

import Image from '../images/image-off-outline.svg';

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


          {info.photos && info.photos.length !== 0 ? (
              <div 
                className="info-window-thumbnail"
                style={{ backgroundImage: `url(${info.photos[0]})` }}
                role="img"
              />
            ) : (
              <div className="info-window-thumbnail empty-state">
                <img width={32} height={32} src={Image} alt="Image off icon" aria-label="Image was not loaded" />
              </div>
            )} 

          
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
