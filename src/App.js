import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import Header from './containers/Header.js';
import Main from './containers/Main';
import SidePanel from './containers/SidePanel';

import MapTheme from './styles/map-style.json';
import * as data from './data/locations.json';

import './App.css';



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
      center: [64.85, -18.45],
      zoom: 6
    },
    isDisconnected: false,
    isLoaded: {
      map: true,
      wiki: true,
      flickr: true
    }
  }


  componentDidMount () {
    this.updateLocations();
    this.mapsLoaded();
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }


  onViewportChanged = viewport => {
    this.setState({ viewport: { center: viewport.center, zoom: viewport.zoom } });
  }
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
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing)
            });
          })
          .catch(() => {
            this.setState({ isDisconnected: true }, () => console.error("You are offline!"))
          })

        }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
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

              let src = 'http://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
              return src;
            })
            pics.push(...picArray);
          })
          .catch(error => {
            // Updating state and specify error
            let issue = this.state.isLoaded;
            issue['flickr'] = false;

            this.setState({ issue })
          })
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
          .catch(error => {

            // Push specific message to <DetailsPage/> of each location item
            let content = `<p>Sorry, there is an error loading information about ${query}. Find out some information on Wikipedia by clicking <a href="https://en.wikipedia.org/wiki/${query}" target="_blank">here</a>.</p>`;
            infoData.push(content);

            // Updating state and specify error
            let issue = this.state.isLoaded;
            issue['wiki'] = false;
            this.setState({ issue })
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
  }


  // Focus view on clicked location function -> marker & list
  centerMap = (location, pos) => {
    // this.setState({ center: pos });
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        center: [pos.lat, pos.lng],
      }
    }));
    this.openInfoWindow(location);
    console.log("co my tu mamy za obiekt?", pos, [pos.lat, pos.lng])
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

  // Checking if map frame loaded correctly as requested
  // If not then updating state isLoaded.map to false

  
  mapsLoaded = () => {
    setTimeout(() => {
      const mapContent = document.querySelector('iframe');

      if (!mapContent) {
        let issue = this.state.isLoaded;
        issue['map'] = false;
        this.setState({ issue })
      }
    }, 3000);
  }











  render() {
    const { viewport, locations, panel, center, zoom, selectedMarker, infoWindow, modal, isLoaded } = this.state

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
          viewport={viewport}
          onViewportChanged={this.onViewportChanged}
          style={MapTheme}
          center={center}
          zoom={zoom}
          panel={panel}
          locations={locations}
          eventHandler={this.centerMap}
          marker={selectedMarker}
          closeInfoWindow={this.closeInfoWindow}
          infoWindow={infoWindow}
          modal={modal}
          closeModal={this.closeModal}
          openModal={this.openModal}
          isLoaded={isLoaded}
        />

      </div>
    );
  }
}

export default App;
