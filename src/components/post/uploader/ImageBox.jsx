import React from 'react';
import { Image } from 'semantic-ui-react';

function ImageBox({ imageUrl, onClick }) {
  return (
    <div className="image-box">
      <Image src={imageUrl ? imageUrl : "/statics/images/noimage.jpg"} alt="Post" />
      <strong className="upload-button" onClick={onClick}>Upload picture</strong>
    </div>
  )
}

export default ImageBox;
