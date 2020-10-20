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
              <div className="location-name-header modal-header" tabIndex="0">
                <h4
                  className="alt-name">
                    {marker.altname}
                </h4>
                <h2 
                  className="name">
                    {marker.name}
                </h2>
              </div>
              <div className="modal-body">
                {marker.photos && (
                  <section className="photos">
                    <p className="section-name">Gallery</p>
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
                )}


                <section className="facts" tabIndex="0">
                  <p className="section-name">Facts</p>
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
                    <p className="section-name">GPS</p>
                    <div className="position-content">
                      <div className="coordinates">
                        <p>N: <span tabIndex="0" aria-label={`Latitude ${latitude} °N`}>{latitude}</span></p>
                        <p>E: <span tabIndex="0" aria-label={`Longitude ${longitude} °E`}>{longitude}</span></p>
                      </div>

                      <Link to={`https://www.google.com/maps/@${latitude},${longitude},13z`} arrow label="See location in Google Maps" /> 
                    </div> 

                    
                  </section>
                )}
              </div>

              <div className="modal-footer">
                <Button 
                  type="primary" 
                  onClick={() => closeModal()}  
                  label="Close"
                  ariaLabel="Close window"
                />
              </div>


              <CloseButton onClick={() => closeModal()} />


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
              <CloseButton onClick={() => closeModal()} />
            </div>
          )}
        </div>
      </div>
    );
}

export default DetailsPage;
