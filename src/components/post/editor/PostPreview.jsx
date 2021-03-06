import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function PostPreview({ type, image, content }) {
  let isPhoto = type === 'photo' ? true : false;
  
  return (
    <Card className="post-preview">
      {isPhoto && <Image src={image} />}
      <Card.Content>
        <div dangerouslySetInnerHTML={{ __html: content }} dir="auto"></div>
        {!isPhoto && image && <Image src={image} />}
      </Card.Content>
    </Card>
  );
}

export default PostPreview;
