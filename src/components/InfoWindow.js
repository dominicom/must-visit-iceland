import React, { Component } from 'react';

import './InfoWindow.css'

const InfoWindow = ({ info, infoWindow, closeInfoWindow }) => {

    return (
      <div id="talkbubble" className="info-window">
        <h2>{info.title}</h2>
        <button className="details-button">Details</button>
        <button className="close"
                onClick={(event) => closeInfoWindow()}>Close</button>
        <div id="shadow"></div>
      </div>
    )
  }


export default InfoWindow;
