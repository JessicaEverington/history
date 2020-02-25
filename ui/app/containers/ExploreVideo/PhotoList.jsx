import React from 'react'; // call in React
import PhotoListItem from './PhotoListItem'; // bring in my list item

// this will feed into PHOTOLISTITEM
export default function PhotoList(props) {
  // pass in the data
  const {
    onPhotoSelect, // JSON obj from index
    photos,
  } = props;

  // map through photos and associate this component (passing the props to child component)
  // React rule: when there are multiple components we need to have a KEY (you can't interact with it though)
  const photoItems = photos.map((photo, index) => (
    <PhotoListItem
      index={index}
      onPhotoSelect={onPhotoSelect}
      key={photo.id}
      photo={photo}
    />
  ));

  return (
    <div id="photo-list">
      {photoItems}
    </div>
  );
}
