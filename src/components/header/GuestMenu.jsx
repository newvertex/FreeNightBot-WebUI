import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const GuestMenu = ({ onLoginClick }) => (
  <Menu.Item
    name='login'
    onClick={onLoginClick}
    position='right'
  >
    <Icon name='sign in' />
    Sign in
  </Menu.Item>
)

GuestMenu.propTypes = {
  onLoginClick: React.PropTypes.func.isRequired,
};

export default GuestMenu;
