import React from 'react';

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function VideoListItem({ index, video, onVideoSelect }) {
  const tabOffset = 2;

  const imageUrl = video.snippet.thumbnails.default.url;

  const isODate = new Date(video.snippet.publishedAt);
  const shortDate = new Date(isODate);
  const day = shortDate.getDate();
  const month = shortDate.getMonth() + 1;
  const year = shortDate.getFullYear();
  const stringdate = `${day}-${month}-${year}`;

  return (
    <div
      className="card border-info mb-3 shadow-sm"
      onClick={() => onVideoSelect(video)}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={tabOffset + index}
    >
      <div className="row no-gutters">
        <div className="d-flex flex-column justify-content-center">
          <img src={imageUrl} alt="Video thumbnail" className="mx-3" />
        </div>
        <div className="col-md-8">
          <div className="card-body text-info">
            <h5 className="card-title">{video.snippet.title}</h5>
            <p className="card-text">
              Brought to you by:
              {video.snippet.channelTitle}
            </p>
            <p className="card-text">
              <small className="text-muted">
                Date posted:
                {stringdate}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
