import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';

import Avatar from './Avatar';

const UserMenu = ({ user, onNewClick }) => (
  <Menu.Menu position='right'>
    <Menu.Item
      name='new'
      onClick={onNewClick}
    >
      <Icon name='add' />
      New
    </Menu.Item>

    <Dropdown
      item
      pointing
      trigger={<Avatar avatar={user.avatar} name={user.displayName} />}
    >
      <Dropdown.Menu>
        <Dropdown.Header>
          <span style={{ textTransform: 'none' }}>
            Signed in as <strong>{user.username}</strong>
          </span>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item text='Dashboard' icon='dashboard' disabled />
        <Dropdown.Item text='Profile' icon='user' disabled />
        <Dropdown.Item text='Help' icon='help' />
        <Dropdown.Divider />
        <Dropdown.Item text='Settings' icon='settings' disabled />
        <Dropdown.Item text='Sign Out' icon='sign out' />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>
)

UserMenu.propTypes = {
  user: React.PropTypes.object.isRequired,
  onNewClick: React.PropTypes.func.isRequired,
};

export default UserMenu;
