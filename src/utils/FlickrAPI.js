



export const getImages = (images) => {
  const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';
  //const SEARCH = 'gullfoss+waterfall';
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${images}&per_page=4&page=1&format=json&nojsoncallback=1`)
     .then(res => res.json())
     .then(data => data.photos.photo.pic)
  }



// export const getImages = (image) => {
//   const FLICKR_KEY = '0121b6c086d3d8304a761283f8dc1d61';
//   //const SEARCH = 'gullfoss+waterfall';
//   fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&tags=${image}&per_page=4&page=1&format=json&nojsoncallback=1`)
//      .then(res => res.json())
//      .then(image => {
//        //console.log(JSON.stringify(j));
//
//        let picArray = image.photos.photo.map((pic) => {
//
//          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
//          // console.log(srcPath);
//        })
//      })
//      .catch(error => console.log(error));
// }
