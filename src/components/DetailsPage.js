import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './DetailsPage.css'




class DetailsPage extends Component {

  render () {
    const { panel, marker, location, modal, closeModal } = this.props;

    let latitude  = `${marker.position ? marker.position.lat.toFixed(4).toString() : undefined}`;
    let longitude = `${marker.position ? marker.position.lng.toFixed(4).toString() : undefined}`;

    return (


      <div className={`modal ${modal ? 'opened' : 'closed'}`}>

      {marker.length !== 0 ? (
        <section className="location-detail-page"
                 tabIndex="0"
                 role="dialog"
                 aria-label= {`You have opened details page of ${marker.altname ? marker.name + ' ' + marker.altname : marker.name}`}
                 aria-modal="true">



        <h2 className="name" tabIndex="0">{marker.altname ? `${marker.name} (${marker.altname})` : `${marker.name}`}</h2>


        <article className="photos">

          <ul className="photos-gallery">
          {marker.photos ? marker.photos.map(photo => (
            <li key={photo}>
                  <a href={photo}
                     target="_blank"
                     aria-label={`Image of ${marker.name}`}>
                    <div className="photo"
                         style={{ backgroundImage: `url(${photo})` }}
                         role="img">
                    </div>
                  </a>
            </li>
          )) : undefined}
          </ul>


          <div className="photos-link">
            <span>Powered by Flickr</span>
            <a href={`https://www.flickr.com/search/?text=${marker.title}`} target="_blank">More photos...</a>
          </div>

        </article>


        <article className="facts" tabIndex="0">
          <div className="content" dangerouslySetInnerHTML={{__html: marker.info }}></div>
        </article>


        <article className="position"
                 tabIndex="0"
                 aria-label="Position GPS">

            <p aria-disabled="true">GPS:</p>
            <p>N: <span tabIndex="0" aria-label={`Latitude ${latitude} °N`}>{latitude}</span></p>
            <p>E: <span tabIndex="0" aria-label={`Longitude ${longitude} °E`}>{longitude}</span></p>
        </article>





        <button className="close"
                onClick={(event) => closeModal()}>Close</button>

        </section>

      ) : (
        <span>No location selected or information loaded</span>
      )}

      </div>
    );
  }
}

export default DetailsPage;
