import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import Header from './components/Header.js';
import Map from './components/Map';
import SidePanel from './components/SidePanel';
// import DetailsPage from './components/DetailsPage'

import MapTheme from './styles/map-style.json';
import * as data from './data/locations.json';
//import * as key from './data.credentials';

import './App.css';
//import './styles/responsive.css';
import './styles/animations.css';



class App extends Component {

  state = {
    panel: true,
    locations: [],
    selectedMarker: [],
    infoWindow: false,
    modal: false,
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
      const match = new RegExp(escapeRegExp(query), 'i');

      this.setState({ locations: data.filter(location =>
        match.test(location.altname ? (location.altname + location.id + location.category) : (location.id + location.name + location.category))
      )});


      // This function checks if <Marker/> is clicked and matched to filtered locations
      // to prevent leaving <InfoWindow/> Component without <Marker/>
      let filtered = this.state.locations;
      let isMatch = (selected, marker) => {
        marker = this.state.selectedMarker;
        return selected = marker;
      }
      let result = filtered.find(isMatch);

      result ? this.setState({ selectedMarker: result }) : this.setState({ selectedMarker: [] });

    } else {
      this.updateLocations();
    }
  }



  updateLocations = () => {
    // Pushing locations data from local JSON to an Array
    let locations = [];
    locations.push(...data)


    // This function gets photos from Flickr and merge to existing locations data in Array
    locations.map(l => {

      //Array with request of pictures related to each location
      let photoUrlData = []

      let getPhotos = (query) => {
        // TODO
        const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';
        // 0121b6c086d3d8304a761283f8dc1d61

        let num = 4;
        let pics = []
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${query}&per_page=${num}&page=1&format=json&nojsoncallback=1`)
          .then(res => {
            //console.log(res);
            return res.json()})
          .then(data => {
            let picArray = data.photos.photo.map(pic => {

                 let src = 'http://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
                 return src;
                 debugger;

           })

           // Pushing temporary pictures data of one location to an Array
           pics.push(...picArray);
            //console.log(query, pics)
         })

         // Pushing all pictures results of all locations to an Array
         photoUrlData.push(pics);
      }

      // Making a request by 'title' variable as a query word of each location as presented in DB from JSON
      //let query = `${l.title}`;

      let photos = getPhotos(l.title);

      let infoData = [];
      let getWikiData = (query) => {
        console.log(query) //&exintro=1
        fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${query.replace(/ /g, '_')}&exintro=1`)
          .then(res => {
            //console.log(res);
            return res.json()})
          .then(data => {
            //console.log(data.query.pages);
            //return data.query.pages    //data.query.pages

            // TODO Troche to bardziej zrobić jak ja bym zrobił :P
            let pages = data.query.pages;
            let pageId = Object.keys(data.query.pages)[0];
            let pageContent = pages[pageId].extract;

            console.log(pages);


            //infoData.push(data.query.pages);
            infoData.push(pageContent);
          })
          .catch(error => console.log(error))
      }
      // Making a request by 'name' variable as a query word of each location as presented in DB from JSON
      let info = getWikiData(l.title);

      // Pushing all pictures to 'location' Array to 'photos' variable of each location
      l['photos'] = photoUrlData[0] // [0] - because results are as Array in Array, it needs to "destruct" :)
      l['info'] = infoData;
    })


    // Setting merged locations data to the state
    this.setState({ locations: locations });

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



  // Open and Close <InfoWindow/> Component
  openInfoWindow = (marker) => {
    this.setState({ selectedMarker: marker, infoWindow: true })
  }
  closeInfoWindow = () => {
    //console.log("closing")
    this.setState({ selectedMarker: [], infoWindow: false })
    console.log(this.state.infoWindow)
  }
  openModal = () => {
    this.setState({ modal: true })
  }
  closeModal = () => {
    console.log("closing")
    this.setState({ modal: false })
    console.log(this.state.infoWindow)
  }








  render() {
    const { locations, panel, center, zoom, selectedMarker, infoWindow, modal } = this.state

    return (

      <div className="app">
        <Header />
        <SidePanel
          toggle={this.toggleSidePanel}
          panel={panel}
          locations={locations}
          eventHandler={this.centerMap}
          filterLocations={this.filterLocations}
          closeInfoWindow={this.closeInfoWindow}
          details={infoWindow}
          getPhotos={this.getPhotos}
          modal={modal}
          openModal={this.openModal}
        />
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
          infoWindow={infoWindow}
          modal={modal}
          closeModal={this.closeModal}
          openModal={this.openModal}
        />

        {/* <DetailsPage
          panel={panel}
          marker={selectedMarker}
          location={locations}
        /> */}
        {/* {console.log("App Component: ", this.openModal)} */}
      </div>
    );
  }
}

export default App;
