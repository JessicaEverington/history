import React from 'react';

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function PhotoListItem({ index, photo, onPhotoSelect }) {
  const tabOffset = 2;
  const imageUrl = photo.photos.photo[0].title;

  return (
    <div
      className="card border-info mb-3 shadow-sm"
      onClick={() => onPhotoSelect(photo)}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={tabOffset + index}
    >
      <div className="row no-gutters">
        <div className="d-flex flex-column justify-content-center">
          <img src={imageUrl} alt="Flickr thumbnail" className="mx-3" />
        </div>
        <div className="col-md-8">
          <div className="card-body text-info">
            <h5 className="card-title">{photo.photos.photo[0].title}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
