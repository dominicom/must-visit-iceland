import React, { Component } from 'react';

import './DetailsPage.css'




class DetailsPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isToggleOn: false, // true testowo
        marker: props.marker
      };

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }








  render () {
    const { panel, marker, location } = this.props
    const { isToggleOn } = this.state

    return (
      <footer
        className={`location-detail-page
                    panel-${panel ? 'show' : 'hidden'}
                    ${marker ? 'marker-selected' : 'no-marker'}
                    ${isToggleOn ? 'open' : 'close'}`}

        tabIndex={isToggleOn ? '0' : '-1'}
        aria-hidden={isToggleOn ? 'false' : 'true'}
        >

        <div className="top-bar">

        </div>


        {marker.length !== 0 ? (
          <section>

          <h2>{`${marker.title} (${marker.category[0]})`}</h2>
          <article className="photos">
            {marker.photos ? marker.photos.map(photo => (
              <li key={photo}
                  style={{ backgroundImage: `url(${photo})` }}
                  className="photo">
              </li>
            )) : undefined}

            <a href={`https://www.flickr.com/search/?text=${marker.title}`} target="_blank">More photos...</a>

          </article>
          <article className="facts">
            <div dangerouslySetInnerHTML={{__html: marker.info }}></div>
            {/* {marker ? marker.info : undefined} */}
          </article>
          <article className="position">
            <h4>GPS:</h4>
            <p>N: <span>{`${marker.position ? marker.position.lat.toString() : undefined}`}</span></p>
            <p>W: <span>{`${marker.position ? marker.position.lng.toString().replace('-', '') : undefined}`}</span></p>
          </article>
          </section>
        ) : (

          <span> No location selected </span>
        )}

        <button className="close"
                onClick={(event) => {
                  event.preventDefault();
                  this.handleClick();

                }}
        >Close</button>



      </footer>
    );
  }
}

export default DetailsPage;
