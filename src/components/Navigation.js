import React from 'react';

import Hamburger from './Hamburger';

import './Navigation.css'

const Navigation = ({ toggle, state, panel }) => {
    return (
      <nav
        className="navigation"
        onClick={() => toggle(state)}
        tabIndex="0" 
        aria-label="Open or Close list of locations"
      >
        <Hamburger
          toggle={toggle}
          panel={panel}
        />
      </nav>
    );
}

export default Navigation;