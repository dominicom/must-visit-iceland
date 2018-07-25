import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './DetailsPage.css'




class DetailsPage extends Component {
  constructor(props) {
    super(props);
    //this.myRef = React.createRef();
  }


  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.ref)
    //this.refs.ref.getDOMNode().focus();
  }


  render () {
    const { panel, marker, location, modal, closeModal } = this.props;

    return (


      <div className={`modal ${modal ? 'opened' : 'closed'}`}

           //tabIndex={`${modal ? '0' : '-1'}`}
           // tabIndex={modal ? 0 : -1}
           // role="dialog"
           // aria-hidden={modal ? false : true}
           // onFocus={modal ? true : false}
           // ref={this.myRef}
           // ref="ref"
      >

      {marker.length !== 0 ? (
        <section className="location-detail-page"
                 //tabIndex={modal ? 1 : -1}
                 tabIndex="0"
                 role="dialog"
                 //ref={this.myRef}
                 // ref="item" onLoad={() => this.refs.item.focus()}
                 //autoFocus="true"
                 aria-labelledby="myDialog"
                 aria-modal="true"
                 ref="ref"
        >



        <h2 className="name" tabIndex="0">{marker.name}</h2>
        <article className="photos" tabIndex="0">
          <ul className="photos-gallery">
          {marker.photos ? marker.photos.map(photo => (
            <li key={photo}
                // style={{ backgroundImage: `url(${photo})` }}
                //className="photo"
                ><img className="photo" alt={`Photo of ${marker.name}`} src={photo}/>
            </li>
          )) : undefined}
          </ul>
          <div className="photos-link">
            <span>Powered by Flickr</span>
            <a href={`https://www.flickr.com/search/?text=${marker.title}`} target="_blank">More photos...</a>
          </div>

        </article>
        <article className="facts">
          <div className="content" dangerouslySetInnerHTML={{__html: marker.info }}></div>
          {/* {marker ? marker.info : undefined} */}
        </article>
        <article className="position">
          <div><h4>GPS:</h4></div>
          <div>
          <p>N: <span>{`${marker.position ? marker.position.lat.toString() : undefined}`}</span></p>
          <p>W: <span>{`${marker.position ? marker.position.lng.toString().replace('-', '') : undefined}`}</span></p>
          </div>
        </article>





        <button className="close"
                onClick={(event) => closeModal()}>Close</button>





        </section>
      ) : (

        <span> No location selected </span>
      )}












      </div>
    );
  }
}

export default DetailsPage;
