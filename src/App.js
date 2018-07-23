import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

import Header from './components/Header.js'
import SidePanel from './components/SidePanel'
import Map from './components/Map'

import MapTheme from './styles/map-style.json';

import * as data from './data/locations.json';

import './App.css';
//import './styles/responsive.css';
import './styles/animations.css';



class App extends Component {

  state = {
    panel: true,
    locations: [],
    selectedMarker: [],
    infoWindow: false,
    query: '',
    center: {
      lat: 64.85,
      lng: -18.45
    },
    zoom: 7
  }


  componentDidMount () {
    this.updateLocations();
  }

  filterLocations = (query) => {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({ locations: data.filter(location => match.test(location.name, location.id) )})


      // This function checks if <Marker/> is clicked and matched to filtered locations
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
    // Pushing locations data from local JSON to an Array
    let locations = [];
    locations.push(...data)

    // This function gets photos from Flickr and merge to existing locations data in Array
    locations.map(l => {

      let urls = []

      let getPhotos = (query) => {
        // TODO
        const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';

        let num = 4;
        let pics = []
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${query}&per_page=${num}&page=1&format=json&nojsoncallback=1`)
          .then(res => res.json())
          .then(data => {

            let picArray = data.photos.photo.map(pic => {

                 let src = 'http://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg'
                 return src

           })
            pics.push(...picArray)
            //console.log(query, pics)
         })
         //console.log(query, pics)
         urls.push(pics)
      }

      let query = `${l.title}`
      let p = getPhotos(query)
      console.log(query)
      l['photos'] = urls[0]
    })


    // Setting merged locations data to the state
    this.setState({ locations: locations })

    console.log(locations)
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
  closeInfoWindow = () => {
    console.log("closing")
    this.setState({ selectedMarker: [], infoWindow: false })
    console.log(this.state.infoWindow)
  }

  render() {
    const { locations, panel, center, zoom, selectedMarker } = this.state

    return (
      <div className="app">
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
          closeInfoWindow={this.closeInfoWindow}
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
          getPhotos={this.getPhotos}
        />
        {/* <DetailsPage /> */}
      </div>
    );
  }
}

export default App;
