import React from 'react';

const Hamburger = ({ toggle, state }) => {
    return (
      <div
        className="hamburger"
        onClick={(event) => toggle(state)}
        style={{
          backgroundColor: '#fff',
          width: 60,
          height: 60
        }}>
        <svg>
          <rect x={10} y={15} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={27} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={39} className="hamburger-element" width={40} height={4}/>
        </svg>
      </div>
    );
}

export default Hamburger;
