import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pin from '../icons/pin.svg';
import './Marker.css';

// STATELESS COMPONENT refactor needed!

class Marker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.any.isRequired,
    eventHandler: PropTypes.func.isRequired
  }

  render () {
    const { name, location, eventHandler } = this.props

    return (
      <div title={name} className="pin">
        <img src={Pin} width={48} height={64} alt={location.name}
          onClick={(event) => eventHandler(location, location.position)}
        />
      </div>
    );
  }
}

export default Marker;
