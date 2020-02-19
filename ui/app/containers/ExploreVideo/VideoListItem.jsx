import React from 'react';

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function VideoListItem({ index, video, onVideoSelect }) {
  const tabOffset = 2;
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    // <div className="video-list-media" onClick={() => onVideoSelect(video)} onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
    //   <div className="media-thumbnail">
    //     <img src={imageUrl} alt="Video thumbnail" />
    //   </div>

    //   <div className="media-heading">
    //     {video.snippet.title}
    //   </div>
    // </div>

    <div className="card mb-3 shadow" onClick={() => onVideoSelect(video)} onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
      <div className="row no-gutters">
        <div className="col-md-2 d-flex flex-column justify-content-center">
          <img src={imageUrl} alt="Video thumbnail" className="mx-3" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{video.snippet.title}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}
