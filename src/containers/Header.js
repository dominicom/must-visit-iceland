import React from 'react';

import Navigation from '../components/Navigation';

import Flag from '../icons/flag.svg';

import './Header.css';

const Header = ({ toggle, panel }) => (
  <header className={`header-container panel-${panel ? 'show' : 'hidden'}`}>
    <div className="logo" role="banner">
      <img className="flag" alt="Logo" src={Flag}/>
      <h2 className="app-name">Must Visit Iceland</h2>
    </div>
    <Navigation 
      toggle={toggle}
      panel={panel}
    />
  </header>
);


export default Header;
