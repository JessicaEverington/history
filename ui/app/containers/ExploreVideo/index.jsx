/* global fetch */
import React, { useState } from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import FlickrSearchBar from './FlickrSearchBar';
// import PhotoList from './PhotoList';
// import PhotoDetail from './PhotoDetail';

const API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;
// const FLICKR_KEY = process.env.HISTORY_FLICKR_API_KEY;

export default function ExploreVideo() {
// export default function ExploreMedia() {
  // YOUTUBE ----------------------------------------------------------------------------
  const [videos, setVideos] = useState([]);
  const [selectedVideo, selectVideo] = useState(null);

  const fetchVideos = (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=1km&maxResults=5${order}`
    + `&part=id,snippet&type=video&videoEmbeddable=true&key=${API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchValue}&type=video${order}`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    return fetch(address)
      .then(response => response.json())
      .then((payload) => {
        setVideos(payload.items);
        selectVideo(payload.items[0]);
        console.log(payload);
      })
      .catch(error => console.debug(error.message));
  };

  const videoSearch = _.debounce((searchValue, options) => fetchVideos(searchValue, options), 400);

  // FLICKR -----------------------------------------------------------------------------
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, selectPhoto] = useState(null);

  const fetchPhotos = (searchValue = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const location = {
      latitude: 49.37885,
      longitude: 10.18711,
    };

    const method = 'flickr.photos.search';
    const params = `&lat=${location.latitude}&lon=${location.longitude}&radius=1`;

    // eslint-disable-next-line max-len
    const geoAddress = `https://www.flickr.com/services/rest/?${params}&method=${method}&api_key=a687e9f7f331a6507fe272fa0ea91080&per_page=5&page=1&format=json&nojsoncallback=1`;
    // eslint-disable-next-line max-len
    const keywordAddress = `https://www.flickr.com/services/rest/?method=${method}&api_key=a687e9f7f331a6507fe272fa0ea91080&tags=${searchValue}&per_page=5&page=1&format=json&nojsoncallback=1`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    return fetch(address)
      .then(response => response.json())
      .then((payload) => {
        // build my url based on Flickr params
        const formatUrl = photo => ({
          src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        });
        // map the url based on 5 results
        const imageUrl = payload.photos.photo.map(formatUrl);
        // generate the img src text ???????
        console.log('here i am');
        console.log(imageUrl);

        setPhotos(imageUrl);
        selectPhoto(imageUrl);
      })
      .catch(error => console.debug(error.message));
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
        {/* comment this out if the page isn't loading */}
        <VideoList onVideoSelect={selectVideo} videos={videos} />
      </div>

      <div className="col-12 col-md-6">
        <h2>Search Flickr</h2>
        <FlickrSearchBar onSearchChange={photoSearch} />
        {/* <PhotoDetail photo={selectedPhoto} /> */}
        {/* <PhotoList onPhotoSelect={selectPhoto} photos={photos} /> */}


        <div id="photo-list">
          <div
            className="card border-info mb-3 shadow-sm"
          >
            <div className="row no-gutters">
              <div className="col-md-3 d-flex flex-column justify-content-center">
                {/* <img src={photos.photo[0].title} alt="Flickr thumbnail" className="mx-3 img-fluid" /> */}
                <svg
                  className="bd-placeholder-img"
                  width="100%"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  role="img"
                  aria-label="Placeholder: Image"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#868e96" />
                  <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Flickr Photo</text>
                </svg>
              </div>
              <div className="col-md-8">
                <div className="card-body text-info">
                  {/* <h5 className="card-title">{photos.photo[0].title}</h5> */}
                  {/* eslint-disable-next-line max-len */}
                  <h5 className="card-title">Im the console log you can see the Flickr urls as an array. The urls change based on the search input. Thusfar I have not been able to get that data in HERE though.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
