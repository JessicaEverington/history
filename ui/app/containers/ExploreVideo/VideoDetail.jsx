import React from 'react';
// MAIN VIDEO PLAYER
export default function VideoDetail({ video }) {
  if (!video) {
    return (
      // <section>
      //   Loading...
      // </section>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const { videoId } = video.id;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section
      id="video-detail"
      className="my-4 d-flex justify-content-md-center border border-info rounded"
    >
      <div
        id="video-player"
        className="mx-2 my-2 col-sm-8 col-sm-offset-2"
      >
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="YouTube video player"
            className="embed-responsive-item"
            src={url}
          />
        </div>
      </div>
      <div
        id="video-text"
        className="mx-3 my-2"
      >
        <div
          id="video-title"
          className="h3 mb-3"
        >
          {video.snippet.title}
        </div>
        <p id="video-description">
          {video.snippet.description}
        </p>
      </div>
    </section>
  );
}
