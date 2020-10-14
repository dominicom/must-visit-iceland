import React, { Component } from 'react';

import Link from '../components/Link';
import Button from '../components/Button';

import './DetailsPage.css'




class DetailsPage extends Component {

  render () {
    const { marker, modal, closeModal } = this.props;

    let latitude  = marker.position ? `${marker.position.lat.toFixed(4).toString()}` : null;
    let longitude = marker.position ? `${marker.position.lng.toFixed(4).toString()}` : null;

    return (


      <div className={`modal ${modal ? 'opened' : 'closed'}`}>

      {marker.length !== 0 ? (
        <section className="location-detail-page"
                 tabIndex="0"
                 role="dialog"
                 aria-label= {`You have opened details page of ${marker.altname ? marker.name + ' ' + marker.altname : marker.name}`}
                 aria-modal="true">


        <div className="modal-header">
          <h2 
            className="name" 
            tabIndex="0">
              {marker.altname ? `${marker.name} (${marker.altname})` : `${marker.name}`}
          </h2>
        </div>

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
            )) : null}
            {/* TO-DO: Place holder */}
          </ul>


          <div className="photos-link">
            <span>Powered by Flickr</span>
            <Link to={`https://www.flickr.com/search/?text=${marker.title}`} arrow label="More photos" />
          </div>

        </article>


        <article className="facts" tabIndex="0">
          <div className="content" dangerouslySetInnerHTML={{__html: marker.info }} />
          <div className="data-link">
            <span>Powered by Wikipedia</span>
            <Link to={`https://en.wikipedia.org/wiki/${marker.title}`} arrow label="Source" />  
          </div>
        </article>

        {latitude && longitude && (
          <article className="position"
                  tabIndex="0"
                  aria-label="Position GPS">

              <p aria-disabled="true">GPS:</p>
              <p>N: <span tabIndex="0" aria-label={`Latitude ${latitude} °N`}>{latitude}</span></p>
              <p>E: <span tabIndex="0" aria-label={`Longitude ${longitude} °E`}>{longitude}</span></p>
              <Link to={`https://www.google.com/maps/@${latitude},${longitude},13z`} arrow label="See location in Google Maps" /> 
          </article>
        )}


        <div className="modal-footer">
          <Button 
            type="primary" 
            onClick={() => closeModal()}  
            label="Close"
            ariaLabel="Close window"
          />
        </div>






        <button className="close"
                onClick={() => closeModal()}>Close</button>

        </section>

      ) : (
        <div className="location-detail-page error">
         <span>Slow network or you are offline</span>
         <p>No information loaded. Please refresh App!</p>
         <div className="modal-footer">
          <Button 
            type="primary" 
            onClick={() => closeModal()}  
            label="Close"
            ariaLabel="Close window"
          />
        </div>
         <button className="close"
                 onClick={() => closeModal()}>Close</button>
       </div>
      )}

      </div>
    );
  }
}

export default DetailsPage;
