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

  // componentDidMount(location.name) {
  //   this.pushImages(image)
  // }

  handleClick = (location, pos) => {
    if (!this.state.isToggleOn) {
      this.props.eventHandler(location, pos);
    }

    this.setState(prevState => ({
    isToggleOn: !prevState.isToggleOn
    }));
    console.log(this.state.isToggleOn)
    console.log(location.title)
    //this.pushImages(location.title)
  }

  eventHandler = (location, pos) => {
    this.props.eventHandler(location, pos);
    //console.log(location)
  }

  pushImages = (image) => {
    const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';
    //const SEARCH = 'gullfoss+waterfall';
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${image}&per_page=4&page=1&format=json&nojsoncallback=1`)
       .then(res => res.json())
       .then(image => {
         let picArray = image.photos.photo.map((pic) => {

           var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
           //console.log(srcPath);
           return srcPath

         })
         this.setState({pictures: picArray});
         console.log(this.state.pictures)
       })
       .catch(error => console.log(error));
  }

  render () {
    const { location } = this.props
    const { isToggleOn } = this.state

    return (
      <div className={`item details-${isToggleOn ? 'show' : 'hidden'}`}>
        <a
          onClick={(event) => {
            event.preventDefault();
            this.handleClick(location, location.position)}
          }
        >{location.name}</a>

        {isToggleOn ? (
        <div className="details">
          <ul>
            {location.category.map(tag =>(
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>
          <img src="true" width={100} height={100}/>
          <p>{location.title}</p>
        </div>
        ) : undefined}

      </div>
    );
  }
}

export default Item;
