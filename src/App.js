import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

import Header from './components/Header.js'
import SidePanel from './components/SidePanel'
import Map from './components/Map'

import MapTheme from './styles/map-style.json';

import * as data from './data/locations.json';
//import * as FlickrAPI from './utils/FlickrAPI';

import './App.css';
//import './styles/responsive.css';
import './styles/animations.css';



class App extends Component {

  state = {
    panel: true,
    locations: [],
    selectedMarker: [],


    infoWindow: false,

    pictures: [],

    query: '',
    center: {
      lat: 64.85,
      lng: -18.45
    },
    zoom: 7
  }


  componentDidMount () {
    this.updateLocations();
    //console.log(this.state.pictures)
    //this.getImages('new york');
    //this.getPhotos('iceland');
    // this.getImages('Hallgrímskirkja');
  }

  filterLocations = (query) => {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({ locations: data.filter(location => match.test(location.name, location.id) )})
      // This function checks if clicked <Marker/> is matched to filtered locations (markers)
      // to prevent leaving <InfoWindow/> Component without <Marker/>
      let filtered = this.state.locations;
      let isMatch = (selected, marker) => {
        marker = this.state.selectedMarker
        return selected = marker;
      }
      let result = filtered.find(isMatch);

      result ? this.setState({ selectedMarker: result }) : this.setState({ selectedMarker: [] })



    } else {
      this.updateLocations();
    }

  }

  updateLocations() {
    let locations = [];
    locations.push(...data)
    let photosQueries = locations.map(l => l.name)
    // photosQueries.forEach(g => {
    //     this.iteratePhotos(g)
    //     console.log(g)
    // })
    console.log(photosQueries)
    //locations.map(l => l.photos.push("someURL"))
    this.setState({ locations: locations })
    console.log(locations)
    //books.map(book => (this.state.stack.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
  }

  iteratePhotos = (image) => {
    const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';



    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${image}&per_page=4&page=1&format=json&nojsoncallback=1`)
       .then(res => res.json())
       .then(image => {
         let picArray = image.photos.photo.map((pic) => {
           let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
           return srcPath
         })
         //return picArray
         //console.log(picArray)
         //this.setState({pictures: picArray});
       })
       //.catch(error => console.log(error));
       //this.setState({pictures: picArray});
  }













  // Open and close <SidePanel/> function
  toggleSidePanel = (panel) => {
    panel = this.state.panel
    panel ? this.setState({ panel: false }) : this.setState({ panel: true });
  }


  // Focus view on clicked location function -> marker & list
  centerMap = (location, pos) => {
    this.setState({ center: pos });
    this.openInfoWindow(location);

  }

  openInfoWindow = (marker) => {
    this.setState({ selectedMarker: marker, infoWindow: true })
  }
  // closeInfoWindow = () => {
  //   this.setState({ selectedMarker: [], infoWindow: false })
  //   console.log(this.state.infoWindow)
  // }




  // getImages = (image) => {
  //   const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';
  //   //const SEARCH = 'gullfoss+waterfall';
  //   fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${image}&per_page=4&page=1&format=json&nojsoncallback=1`)
  //      .then(res => res.json())
  //      .then(image => {
  //        let picArray = image.photos.photo.map((pic) => {
  //          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
  //          return srcPath
  //        })
  //        //console.log(picArray);
  //        this.setState({ pictures: picArray });
  //
  //      })
  //      .catch(error => console.log(error));
  // }




















  render() {
    const { locations, panel, center, zoom, selectedMarker } = this.state

    return (
      <div className="app">
        {/* {console.log(this.state.infoWindow)} */}
        {/* {console.log(this.state.pictures)} */}
        <Header />
        <Map
          style={MapTheme}
          center={center}
          zoom={zoom}
          panel={panel}
          locations={locations}
          eventHandler={this.centerMap}
          marker={selectedMarker}
          openInfoWindow={this.openInfoWindow}
          infoWindow={this.state.infoWindow}
        />
        <SidePanel
          toggle={this.toggleSidePanel}
          panel={panel}
          locations={locations}
          eventHandler={this.centerMap}
          filterLocations={this.filterLocations}
          closeInfoWindow={this.closeInfoWindow}
          details={this.state.infoWindow}
        />
      </div>
    );
  }
}

export default App;
