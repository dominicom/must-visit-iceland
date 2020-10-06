import React from 'react';
import './Pin.css';

const Pin = () => {
  return(
    <div className="pin">
      <svg
        className="pin-shadow"
        xmlns="http://www.w3.org/2000/svg" 
        x={0}
        y={0}
        viewBox="0 0 48 64"
        width={48}
        height={64} 
      >
        <g className="st0">
          <path className="st0" d="M32.5,36.5c-9.7,0-18.6,3.3-19.9,7.5c-1.9,6,6.8,7.7,11.3,20c12.1-12.3,21.9-14,23.8-20 C49,39.9,42.2,36.5,32.5,36.5z"/>
        </g>
      </svg>
      <svg
        className="pin-body"
        xmlns="http://www.w3.org/2000/svg" 
        x={0}
        y={0}
        viewBox="0 0 48 64"
        width={48}
        height={64} 
      >
        <g>
          <path d="M24,17c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S20.1,17,24,17 M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16 L24,16z"/>
          <path className="st1" d="M24,9v55c7.1-24.6,15-28,15-40C39,15.7,32.3,9,24,9z"/>
          <path className="st2" d="M24,9v55C16.9,39.4,9,36,9,24C9,15.7,15.7,9,24,9z"/>
          <g className="st0">
            <path d="M24,10c7.7,0,14,6.3,14,14c0,5.9-1.9,9.5-4.9,15.1c-2.7,5-5.9,11.2-9.1,21.4c-3.2-10.2-6.5-16.4-9.1-21.4 C11.9,33.5,10,29.9,10,24C10,16.3,16.3,10,24,10 M24,9C15.7,9,9,15.7,9,24c0,12,7.9,15.4,15,40c7.1-24.6,15-28,15-40 C39,15.7,32.3,9,24,9L24,9z"/>
          </g>
          <circle className="st3" cx="24" cy="24" r="8"/>
        </g>

      </svg>
    </div>
  );
}

export default Pin;