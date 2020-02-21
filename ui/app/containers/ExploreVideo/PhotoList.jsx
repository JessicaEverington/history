import React from 'react'; // cal in React
import PhotoListItem from './PhotoListItem';

export default function PhotoList(props) {
  const {
    onPhotoSelect, // JSON obj
    photos,
  } = props;
  const photoItems = photos.map((photo, index) => (
    <PhotoListItem
      index={index}
      onPhotoSelect={onPhotoSelect}
      key={photo.id}
      photo={photo}
    />
  ));
  // map through photos and associate this component (passing the props to child component)
  // React rule: when there are multiple components we need to have a KEY (you can't interact with it though)
  return (
    <div id="photo-list">
      {photoItems}
    </div>
  );
}
