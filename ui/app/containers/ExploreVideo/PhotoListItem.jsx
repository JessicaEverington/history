import React from 'react';
// import styled from 'styled-components';
// import Photos from './Photos';

// function handleKeyPress(event) {
//   if (event.key === 'Enter') {
//     event.target.click();
//   }
// }

// need to pass in proprs from parent so this has access to data
export default function PhotoListItem({ photo }) {
  // const tabOffset = 2;
  // const imageTitle = photo.photos.photo[0].title;
  const imageUrl = photo.src; // just need to grab to SRC from my formatted URL
console.log(photo);
  return (
    <div
      className="card border-info mb-3 shadow-sm"
      // onClick={() => onPhotoSelect(photo)}
      // onKeyPress={handleKeyPress}
      // role="button"
      // tabIndex={tabOffset + index}
    >
      <div className="row no-gutters">
        <div className="col-md-3 py-3 px-3">
          <img src={imageUrl} alt="Flickr thumbnail" className="mx-auto img-thumbnail" />
        </div>
        <div className="col-md-8">
          <div className="card-body text-info">
            {/* <h5 className="card-title">{imageTitle}</h5> */}
          </div>
        </div>
      </div>
    </div>
  );
}
