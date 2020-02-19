import React from 'react'; // cal in React
import VideoListItem from './VideoListItem'; // refers to another component

export default function VideoList(props) {
  const {
    onVideoSelect, // YT JSON
    videos,
  } = props;
  const videoItems = videos.map((video, index) => <VideoListItem index={index} onVideoSelect={onVideoSelect} key={video.etag} video={video} />);
  // map through videos and associate this component (passing the props to child component)
  // React rule: when there are multiple components we need to have a KEY (you can't interact with it though)
  return (
    <nav id="video-list">
      {videoItems}
    </nav>
  );
}
