import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-mapbox-gl'; 

import Pin from '../icons/Pin';

import './LocationMarker.css';

const LocationMarker = (props) => {
  return (
    <Marker 
      title={props.name}
      className={`marker ${props.marker.id === props.location.id ? 'bounce active' : ''}`}
      title={props.name}
      coordinates={props.coordinates} 
      anchor="bottom"
      onClick={() => props.eventHandler(props.location, props.coordinates)}
      tabIndex={props.panel ? -1 : 0}
    >
      <Pin />
      {/* <img src={Pin}
          width={48}
          height={64}
          alt={`Marker of location ${props.location.altname ? props.location.altname : props.location.title}`}
          
          tabIndex={props.panel ? -1 : 0}
        /> */}
      {/* <div
        title={props.name}
        className={`marker ${props.marker.id === props.location.id ? 'bounce' : 'pin'}`}>



      </div> */}
    </Marker>
  );
}
export default LocationMarker;

LocationMarker.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
  eventHandler: PropTypes.func.isRequired
}
