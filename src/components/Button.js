import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ label, onClick, type, ariaLabel }) => {
  return(
    <button 
      className={`button btn-${type ? type : "default"}`}
      onClick={onClick}
      aria-label={ariaLabel}

    >
      {label}
    </button>
  );
}

export default Button; 

Button.propTypes = {
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}