/* global fetch */
import React, { useState } from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import FlickrSearchBar from './FlickrSearchBar';
import PhotoList from './PhotoList';
// import PhotoDetail from './PhotoDetail';

const API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;
// const FLICKR_KEY = process.env.HISTORY_FLICKR_API_KEY;

export default function ExploreVideo() {
// export default function ExploreMedia() {
  // YOUTUBE ----------------------------------------------------------------------------
  const [videos, setVideos] = useState([]);
  const [selectedVideo, selectVideo] = useState(null);

  // const fetchVideos = (searchValue, options = {}) => {
  // declare the async function
  // The word “async” before a function means that function always returns a promise
  // eslint-disable-next-line consistent-return
  const fetchVideos = async (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=1km&maxResults=5${order}`
    + `&part=id,snippet&type=video&videoEmbeddable=true&key=${API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchValue}&type=video${order}`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    // return fetch(address)
    //   .then(response => response.json())
    //   .then((payload) => {
    //     setVideos(payload.items);
    //     selectVideo(payload.items[0]);
    //     console.log(payload);
    //   })
    //   .catch(error => console.debug(error.message));

    // convert to async/await
    try {
      // moving the fetch call into here
      // the fetch call is our Promise
      const response = await fetch(address); // first we want the response
      const payload = await response.json(); // when we get the response convert to JSON
      setVideos(payload.items); // pass the object
      selectVideo(payload.items[0]);
    } catch (error) {
      // The promise may take some time before it rejects, so there will be a delay before await throws an error
      // We can CATCH that error using TRY{}CATCH{} syntax
      // In the case of an error, the control jumps to the catch block
      return console.log(error.message);
    }
  };

  const videoSearch = _.debounce((searchValue, options) => fetchVideos(searchValue, options), 400);

  // FLICKR -----------------------------------------------------------------------------
  const [photos, setPhotos] = useState([]);
  // const [selectedPhoto, selectPhoto] = useState(null);

  const fetchPhotos = async (searchValue = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const location = {
      latitude: 49.37885,
      longitude: 10.18711,
    };

    const method = 'flickr.photos.search';
    const params = `&lat=${location.latitude}&lon=${location.longitude}&radius=2`;

    // eslint-disable-next-line max-len
    const geoAddressFlickr = `https://www.flickr.com/services/rest/?${params}&method=${method}&api_key=a687e9f7f331a6507fe272fa0ea91080&per_page=5&page=1&format=json&nojsoncallback=1`;
    // eslint-disable-next-line max-len
    const keywordAddressFlickr = `https://www.flickr.com/services/rest/?method=${method}&api_key=a687e9f7f331a6507fe272fa0ea91080&tags=${searchValue}&per_page=5&page=1&format=json&nojsoncallback=1`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddressFlickr : keywordAddressFlickr;

    // return fetch(address)
    //   .then(response => response.json())
    //   .then((payload) => {
    //     // build my url based on Flickr params
    //     const formatUrl = photo => ({
    //       src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    //     });
    //     // map the url based on 5 results
    //     const imageUrl = payload.photos.photo.map(formatUrl);
    //     console.log('here i am');
    //     console.log(imageUrl);

    //     setPhotos(imageUrl);
    //     // selectPhoto(imageUrl);
    //   })
    //   .catch(error => console.debug(error.message));

    try {
      const response = await fetch(address);
      const payload = await response.json();
      const formatUrl = photo => ({
        src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      });
      const imageUrl = payload.photos.photo.map(formatUrl);
      console.log(imageUrl);
      setPhotos(imageUrl);
    } catch (error) {
      return console.debug(error.message);
    }
  };

  const photoSearch = _.debounce(searchValue => fetchPhotos(searchValue), 400);

  // RENDER -----------------------------------------------------------------------------
  return (
    <section
      id="video-component"
      className="mt-5 pt-5 pb-4 row"
    >
      <div className="col-12 col-md-6">
        <h2>Search YouTube</h2>
        <SearchBar onSearchChange={videoSearch} />
        <VideoDetail video={selectedVideo} />
        <VideoList onVideoSelect={selectVideo} videos={videos} />
      </div>

      <div className="col-12 col-md-6">
        <h2>Search Flickr</h2>
        <FlickrSearchBar onSearchChange={photoSearch} />
        {/* <PhotoDetail photo={selectedPhoto} /> */}
        <PhotoList photos={photos} />
      </div>
    </section>
  );
}
