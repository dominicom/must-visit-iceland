import React, { Component } from 'react';

import Flag from '../icons/flag.svg';

class Header extends Component {
  render () {
    return (
      <header className="logo">
        <img className="flag" src={Flag}/>
        <h2 className="slogan">Must Visit Iceland</h2>
      </header>
    );
  }
}

export default Header;
