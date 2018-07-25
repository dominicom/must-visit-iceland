import React, { Component } from 'react';

import './LocationItem.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      pictures: []
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (location, pos) => {
    if (!this.state.isToggleOn) {
      this.props.eventHandler(location, pos);
    }

    this.setState(prevState => ({
    isToggleOn: !prevState.isToggleOn
    }));
  }

  eventHandler = (location, pos) => {
    this.props.eventHandler(location, pos);
  }


  render () {
    const { location } = this.props
    const { isToggleOn } = this.state

    return (
      <div className={`item details-${isToggleOn ? 'show' : 'hidden'}`}
           tabIndex="0"
           aria-label={( location.altname )
                       ?
                       ( `Location ${location.name}, in english ${location.altname}, category: ${location.category.join(', ')}` )
                       :
                       ( `Location ${location.title}, ${location.category.join(', ')}`)
                       }>
        <a
          onClick={(event) => {
            event.preventDefault();
            this.handleClick(location, location.position)}
          }
        >{location.name}</a>

        {isToggleOn ? (
        <div className="details">
          <h4>{location.altname ? location.altname : `${location.title} ${location.category[0]}`}</h4>
          <ul>
            {location.category.map(tag => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>

          {/* <div
               style={{ backgroundImage: `url(${location.photos[0]})` }}
               className="photo"></div> */}
          <ul className="item-list-images">
            {location.photos.map(photo => (
              <li key={photo}
                  style={{ backgroundImage: `url(${photo})` }}
                  className="photo">
              </li>
            ))}
          </ul>

          <button className="details-button">Details</button>
          {/* <div className="list-item-description">
            <p>Lorem Ipsum Dolor Met Madafaka Szit Heppens</p>
          </div> */}
        </div>
        ) : undefined}

      </div>
    );
  }
}

export default Item;
