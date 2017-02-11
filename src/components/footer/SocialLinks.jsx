import React from 'react';
import map from 'lodash/map';
import { List } from 'semantic-ui-react';

const SocialLinks = ({ social }) => (
  <List horizontal link size='huge'>
    {
      map(social, (value, key) =>
        <List.Item key={key} as='a' href={value} icon={key} />
      )
    }
  </List>
);

SocialLinks.propTypes = {
  social: React.PropTypes.object,
};

export default SocialLinks;
