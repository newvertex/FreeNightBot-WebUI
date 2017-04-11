import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const GuestMenu = () => (
  < Menu.Item
    name='login'
    position='right'
    as='a'
    href='#/login'
  >
    <Icon name='sign in' />
    Sign in
  </Menu.Item >
)

export default GuestMenu;
