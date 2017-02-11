import React from 'react';
import { Image } from 'semantic-ui-react';

const Avatar = ({ avatar, name }) => (
  <span>
    <Image avatar src={avatar} />
    <span className='hide-on-mobile'>{name}</span>
  </span>
);

Avatar.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
};

export default Avatar;
