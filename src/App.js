import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import Header from './containers/Header.js';
import Main from './containers/Main';
import SidePanel from './containers/SidePanel';

// To-Do
import MapTheme from './styles/map-style.json';
import * as data from './data/locations.json';

import './App.css';
import { PositionOptions } from 'mapbox-gl';

const MyOverlay = { 
  maxBounds: { 
    minLatitude: 62,
    maxLatitude: 68,
    minLongitude: -24,
    maxLongitude: -12
  }
}

class App extends Component {

  state = {
    panel: false,
    locations: [],
    selectedMarker: [],
    infoWindow: false,
    modal: false,
    query: '',
    center: {
      lat: 64.85,
      lng: -18.45
    },
    zoom: 7,
    viewport: {
      latitude: 64.85,
      longitude: -18.45,
      zoom: 5
    },
    isError: {
      connection: false,
      wiki: false,
      flickr: false
    }
  }


  componentDidMount () {
    this.updateLocations();
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  
  // Fix for maxbounds to fit the map only for Iceland view:
  // https://github.com/visgl/react-map-gl/issues/442
  onViewportChange = viewport => {
    if ( viewport.longitude < MyOverlay.maxBounds.minLongitude ) {
      viewport.longitude = MyOverlay.maxBounds.minLongitude;
    }
    else if ( viewport.longitude > MyOverlay.maxBounds.maxLongitude ) {
      viewport.longitude = MyOverlay.maxBounds.maxLongitude;
    }
    else if ( viewport.latitude < MyOverlay.maxBounds.minLatitude ) {
      viewport.latitude = MyOverlay.maxBounds.minLatitude;
    }
    else if ( viewport.latitude > MyOverlay.maxBounds.maxLatitude ) {
      viewport.latitude = MyOverlay.maxBounds.maxLatitude;
    }
    this.setState( {
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  // Function on viewport change without map max bounds
  // onViewportChange = viewport => this.setState({ viewport });



  // Change on online/offline detection
  // https://www.codementor.io/@nedson/a-guide-to-handling-internet-disconnection-in-react-applications-rs7u9zpwn
  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch('//google.com', {
            mode: 'no-cors',
            })
          .then(() => {
            this.setState(state => ({ isError: { ...state.isError, connection: false } }), () => {
              return clearInterval(webPing)
            });
          })
          .catch(() => {
            this.setState(state => ({ isError: { ...state.isError, connection: true } }), () => console.error("You are offline!"))
          })

        }, 2000);
      return;
    }

    return this.setState(state => ({ isError: { ...state.isError, connection: true } }));
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
    // Pushing locations and initial data from local JSON to an Array - './data/locations.json'
    let locations = [];
    locations.push(...data);

    // This function gets photos from Flickr and Wiki Data
    // Next it merges to existing locations data in Array
    locations.map(l => {

      //Get photos from Flickr
      let photoUrlData = [];

      let getPhotos = (query) => {

        const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';

        let num = 4;
        let pics = [];
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${query}&per_page=${num}&page=1&format=json&nojsoncallback=1`)
          .then(res => res.json())
          .then(data => {
            let picArray = data.photos.photo.map(pic => {

              let src = `http://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
              return src;
            })
            pics.push(...picArray);
          })
          .catch(() => this.setState(state => ({ isError: { ...state.isError, flickr: true } })));
         // Pushing all pictures results of all locations to an Array
         photoUrlData.push(pics);
      }

      // Wiki get data function
      let infoData = [];

      let getWikiData = (query) => {    // format

        fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${query.replace(/ /g, '_')}&exintro=1`)
          .then(res => {
            return res.json()})
          .then(data => {

            let content = data.query.pages[Object.keys(data.query.pages)[0]].extract;
            infoData.push(content);

          })
          .catch(() => {

            // Push specific message to <DetailsPage/> of each location item
            let content = `<p>Sorry, there is an error loading information about ${query}. Find out some information on Wikipedia by clicking <a href="https://en.wikipedia.org/wiki/${query}" target="_blank">here</a>.</p>`;
            infoData.push(content);

            // Updating state and specify error
            this.setState(state => ({ isError: { ...state.isError, wiki: true } }))
          })

      }
      // Making a request by 'title' as a query for each location
      getPhotos(l.title);    // fetching images form Flicker
      getWikiData(l.title);  // fetching  data  form Wikipedia

      // Pushing all pictures to 'location' Array to 'photos' variable of each location
      l['photos'] = photoUrlData[0] // [0] - because results are as Array in Array, it needs to "destruct" :)
      l['info'] = infoData;

      return locations;
    });
    
    // Setting merged locations data to the state
    this.setState({ locations: locations });
    console.log(locations)
  }



  // Open and close <SidePanel/> function
  toggleSidePanel = (panel) => {
    panel = this.state.panel
    panel ? this.setState({ panel: false }) : this.setState({ panel: true });
    console.log("skonsoluj mi ten klik")
  }


  // Focus view on clicked location function -> marker & list
  centerMap = (location) => {
    // console.log("iwenthandler", pos, location)
    this.setState({ viewport: { latitude: location.position.lat, longitude: location.position.lng, zoom: this.state.viewport.zoom } });
    this.openInfoWindow(location);
  }

  // Open and Close <InfoWindow/> Component
  openInfoWindow = (marker) => {
    this.setState({ selectedMarker: marker, infoWindow: true })
  }
  closeInfoWindow = () => {
    this.setState({ selectedMarker: [], infoWindow: false })
  }

  // Open and Close <DetailsPage/> Component
  openModal = () => {
    this.setState({ modal: true })
  }
  closeModal = () => {
    this.setState({ modal: false })
  }


  render() {
    const { 
      viewport, 
      locations, 
      panel, 
      center, 
      zoom, 
      selectedMarker, 
      infoWindow, 
      modal, 
      isError 
    } = this.state

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

        <Main
          style={MapTheme}
          center={[ center.lng, center.lat ]}
          zoom={zoom}
          viewport={viewport}
          onViewportChange={this.onViewportChange}
          panel={panel}
          locations={locations}
          eventHandler={this.centerMap}
          marker={selectedMarker}
          closeInfoWindow={this.closeInfoWindow}
          infoWindow={infoWindow}
          modal={modal}
          closeModal={this.closeModal}
          openModal={this.openModal}
          isError={isError}
          // isDisconnected={this.state.isDisconnected}
        />

      </div>
    );
  }
}

export default App;
