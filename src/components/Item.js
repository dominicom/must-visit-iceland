import React, { Component } from 'react';
import * as FocusTrap from '../utils/FocusTrap';

import Button from './Button';

import './Item.css';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      isToggleOn: false
    };

    // This binding is necessary to make `this` work in the callback founded solution on StackOverflow
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (location) => {
    if (!this.state.isToggleOn) {
      this.props.eventHandler(location);
    }

    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }


  render () {
    const { location, openModal, panel } = this.props;
    const { isToggleOn } = this.state;

    console.log(location.position);

    return (
      <div className={`item details-${isToggleOn ? 'show' : 'hidden'}`}
           tabIndex={panel ? 0 : -1}
           aria-label={( location.altname )
                       ?
                       ( `Location ${location.name}, in english ${location.altname}, category: ${location.category.join(', ')} click for more details` )
                       :
                       ( `Location ${location.title}, ${location.category.join(', ')} click for more details`)
                       }>
        <a 
          aria-disabled={isToggleOn ? true : false}
          aria-label={`Rollout popup for ${location.name}`}
          onClick={(event) => {
            this.handleClick(location, location.position);
            event.preventDefault();
          }}
        > 
          <div className="item-name">
            <h4>{location.altname ? location.altname : `${location.title} ${location.category[0]}`}</h4>
            <h2>{location.name}</h2>
          </div>
        </a>

        {/* If location name is clicked then rollups some extra details */}
        {isToggleOn ? (
          <div className="details-container">

            <ul className="item-list-tags">
              {location.category.map(tag => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>

            <ul className="item-list-images">
              {location.photos.map(photo => (
                <li key={photo}
                    style={{ backgroundImage: `url(${photo})` }}
                    className="photo"
                    role="img">
                </li>
              ))}
            </ul>

            <div className="item-list-bottom-panel">
            <Button 
                // type="secondary"
                ariaLabel={`Hide ditails of ${location.name}`}
                onClick={() => this.setState({ isToggleOn: false })}
                label="Hide"
              />
              <Button 
                type="primary"
                ariaLabel={`Click to learn more about this location ${location.name}`}
                onClick={() => {
                  openModal()
                  FocusTrap.onFocus(); // FOCUS TRAP function to set focus on modal window of location details, <DetailsPage/> Component
                }}
                label="Learn more"
              />
            </div>
          </div>
        ) : (
          <EmptyState />
        )}

      </div>
    );
  }
}

export default Item;


const EmptyState = () => <div className="item-list-empty-state" />