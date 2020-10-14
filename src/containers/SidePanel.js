import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

import Hamburger from '../components/Hamburger';
import Item from '../components/Item';
import Button from '../components/Button';

import './SidePanel.css';

class SidePanel extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }

  queryHandler = (query) => {
    this.setState({ query: query });
    this.props.filterLocations(query);
  }

  render () {
    const { toggle, panel, locations, eventHandler, openModal } = this.props
    const { query } = this.state

    return (
      <aside className={`side-panel ${panel ? 'show' : 'hidden'}`}>

        <Hamburger
          toggle={toggle}
          panel={panel}
        />

        <div className="side-panel-bar">
          <DebounceInput
            className={`filter-input ${query !== '' ? `query state${locations.length === 0 ? "-error" : "-success"}` : null}`}
            type="text"
            placeholder="Filter..."
            onChange={(event) => this.queryHandler(event.target.value)}
            value={query}
            debounceTimeout={500}
            tabIndex={panel ? 0 : -1}
            aria-label="Filter locations"
            aria-hidden={panel ? false : true}
          />
        </div>

        <div 
          className={`locations-list${locations.length === 0 ? " empty" : ""}`} 
          tabIndex={panel ? 0 : -1} 
          aria-label={`List of ${locations.length} locations`}
        >
            {locations.map(location => (
              <Item
                key={location.id}
                location={location}
                eventHandler={eventHandler}
                getPhotos={this.props.getPhotos}
                openModal={openModal}
                panel={panel}
              />
            ))}
            {locations.length === 0 && (
              <div className="empty-state">
                <div className="message">
                  <h2>No results</h2>
                  <p>it looks like there is no searched location or query word is invalid. Try again.</p>
                </div>
                <Button 
                  type="primary"
                  onClick={() => this.queryHandler('')}
                  label="Clear filter"
                />

              </div>
            )}

        </div>

        {query && locations.length !== 0 && (
              <div className="action-panel">
                <Button 
                  type="accent"
                  onClick={() => this.queryHandler('')}
                  label="Clear results"
                />
              </div>
            )}
      </aside>
    );
  }
}

export default SidePanel;
