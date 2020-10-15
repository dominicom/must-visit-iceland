import React from 'react';

import './Hamburger.css'
// To-Do
const Hamburger = ({ toggle, state }) => {
    return (
      <button 
        className="hamburger"
        onClick={() => toggle(state)}
        tabIndex="0" 
        aria-label="Open or Close filter and list of locations"
      >
        <svg>
          <rect x={10} y={15} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={27} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={39} className="hamburger-element" width={40} height={4}/>
        </svg>
      </button>
    );
}

export default Hamburger;
