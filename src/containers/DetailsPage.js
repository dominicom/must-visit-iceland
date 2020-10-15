import React from 'react';

import Link from '../components/Link';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';

import './DetailsPage.css'




const DetailsPage = (props) => {

  
    const { marker, closeModal } = props;

    let latitude  = marker.position ? `${marker.position.lat.toFixed(4).toString()}` : null;
    let longitude = marker.position ? `${marker.position.lng.toFixed(4).toString()}` : null;

    return (


      <div className="modal">
        <div className="modal-container">
          {marker.length !== 0 ? (
        
            <article 
              className="location-detail-page"
              tabIndex="0"
              role="dialog"
              aria-label= {`You have opened details page of ${marker.altname ? marker.name + ' ' + marker.altname : marker.name}`}
              aria-modal="true"
            >
              <div className="location-name-header" tabIndex="0">
                <h4
                  className="alt-name">
                    {marker.altname}
                </h4>
                <h2 
                  className="name">
                    {marker.name}
                </h2>
              </div>

              <section className="photos">

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

              </section>


              <section className="facts" tabIndex="0">
                <div className="content" dangerouslySetInnerHTML={{__html: marker.info }} />
                <div className="data-link">
                  <span>Powered by Wikipedia</span>
                  <Link to={`https://en.wikipedia.org/wiki/${marker.title}`} arrow label="Source" />  
                </div>
              </section>

              {latitude && longitude && (
                <section 
                  className="position"
                  tabIndex="0"
                  aria-label="Position GPS"
                >
                  <div aria-label="">    
                    <p aria-disabled="true">GPS:</p>
                    N: <span tabIndex="0" aria-label={`Latitude ${latitude} °N`}>{latitude}</span>
                    / E: <span tabIndex="0" aria-label={`Longitude ${longitude} °E`}>{longitude}</span>
                  </div> 

                  <Link to={`https://www.google.com/maps/@${latitude},${longitude},13z`} arrow label="See location in Google Maps" /> 
                </section>
              )}


              <div className="modal-footer">
                <Button 
                  type="primary" 
                  onClick={() => closeModal()}  
                  label="Close"
                  ariaLabel="Close window"
                />
              </div>


              <CloseButton onClick={() => closeModal()} />



            {/* <button className="close"
                    onClick={() => closeModal()}>Close</button> */}

            </article>
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
          </div>
          )}
        </div>
      </div>
    );
}

export default DetailsPage;
