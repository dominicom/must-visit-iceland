import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-map-gl'; 

import Pin from '../icons/Pin';

import './LocationMarker.css';

const LocationMarker = ({ location, marker, eventHandler }) => {
  return (
    <Marker 
      // title={props.name}
      className={`marker ${marker.id === location.id ? 'bounce active' : ''}`}
      // tabIndex={props.panel ? -1 : 0}
      latitude={location.position.lat} 
      longitude={location.position.lng}
      offsetLeft={-24} offsetTop={-64}
    >
      <Pin onClick={() => eventHandler(location)} />
    </Marker>
  );
}
export default LocationMarker;

LocationMarker.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
  eventHandler: PropTypes.func.isRequired
}
