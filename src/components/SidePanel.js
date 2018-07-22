import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

import Hamburger from './Hamburger';
import Item from './LocationItem'

import './SidePanel.css';

class SidePanel extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired,
  }



  state = {
    query: '',
    details: false
  }




  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }



  queryHandler = (query) => {
    this.setState({ query: query })
    this.props.filterLocations(query)
  }

  render () {
    const { toggle, panel, locations, eventHandler } = this.props
    const { query, details } = this.state

    return (
      <aside className={`side-panel ${panel ? 'show' : 'hidden'}`}>
        <div className="side-panel-bar">
          <DebounceInput
            type="text"
            placeholder="Filter..."
            onChange={(event) => this.queryHandler(event.target.value)}
            value={query}
            debounceTimeout={500}
          />
        </div>
        <div className="places-list">
            {locations.map(location => (
              <Item
                key={location.id}
                location={location}
                eventHandler={eventHandler}
              />
            ))}
        </div>
        <Hamburger
          toggle={toggle}
          panel={panel}
        />
      </aside>
    );
  }
}

export default SidePanel;
