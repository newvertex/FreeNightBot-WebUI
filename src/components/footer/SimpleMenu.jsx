import React from 'react';
import { List } from 'semantic-ui-react';

const items = [
  { key: 'help', content: 'Help', as: 'a', href: '#/help' },
  { key: 'contact', content: 'Contact', as: 'a', href: '#/contact'},
]

const SimpleMenu = () => (
  <List  horizontal items={items} />
);

export default SimpleMenu;
