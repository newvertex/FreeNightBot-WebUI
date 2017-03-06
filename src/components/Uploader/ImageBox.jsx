import React from 'react';

function ImageBox({ imageUrl, onClick }) {
  return (
    <div className="image-box">
        <img src={imageUrl ? imageUrl : "/statics/images/noimage.jpg"} alt="Post"/>
        <span className="upload-button" onClick={onClick}>Upload picture</span>
    </div>
  )
}

export default ImageBox;
