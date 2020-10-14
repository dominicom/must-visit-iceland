import React from 'react';

import './Link.css';

const Link = ({ to, label, ariaLabel, arrow }) => (
  <a 
    className="link"
    href={to}
    target="_blank"
  >
    {label}{arrow && " →"}
  </a>
);

export default Link;