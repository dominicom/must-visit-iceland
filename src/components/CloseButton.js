import React from 'react';
import PropTypes from 'prop-types';

import './CloseButton.css';

const CloseButton = ({ onClick, ariaLabel }) => (
  <button 
    className="close-button close"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <Icon />
  </button>
);

export default CloseButton;

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

const Icon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    x="0px" 
    y="0px"
	  viewBox="0 0 24 24"
  >
    <rect x="2" y="10.5" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" width="20" height="2" />
    <rect x="2" y="10.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 12 -4.9706)" width="20" height="2" />
  </svg>
)