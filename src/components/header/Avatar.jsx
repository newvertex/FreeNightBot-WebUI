import React from 'react';
import { Image } from 'semantic-ui-react';

const Avatar = ({ avatar, name }) => (
  <span>
    <Image avatar src={avatar} />
    {name}
  </span>
);

Avatar.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
};

export default Avatar;
