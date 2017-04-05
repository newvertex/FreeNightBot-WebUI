import React from 'react';
import { Image, Icon } from 'semantic-ui-react';

function ImageBox({ imageUrl, onClick, onRemoveImage }) {
  return (
    <div className="image-box">
      <Icon className="remove-image" name="remove circle outline" size="big" onClick={onRemoveImage} />
      <Image src={imageUrl ? imageUrl : "/statics/images/noimage.jpg"} alt="Post" />
      <strong className="upload-button" onClick={onClick}>Upload picture</strong>
    </div>
  )
}

export default ImageBox;
