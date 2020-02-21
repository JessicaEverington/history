import React from 'react';
// MAIN PHOTO
export default function PhotoDetail({ photo }) {
  if (!photo) {
    return (
      // <section>
      //   Loading...
      // </section>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const image = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

  return (
    <section
      id="photo-detail"
      className="my-4 d-flex justify-content-center border border-info rounded"
    >
      <div
        id="photo-player"
        className="mx-2 my-2"
      >
        <img
          src={image}
          alt="Flickr thumbnail"
          className="mx-3 img-fluid"
        />
      </div>
      <div
        id="photo-text"
        className="mx-3 my-2"
      >
        <div
          id="photo-title"
          className="h3 mb-3"
        >
          hello
        </div>
        <p id="photo-description">
          hello
        </p>
      </div>
    </section>
  );
}
