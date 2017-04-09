import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import Backend from './../../backend';

function userAvatar(name) {
  return (
    <span>
      <Avatar name={name} size={48} round style={{ marginRight: '4px' }} />
      <span className='hide-on-mobile'>{name}</span>
    </span >
  )
}

function logout() {
  Backend.app.logout();
  window.location.href = '/';
}

const UserMenu = ({ user }) => (
  <Menu.Menu position='right'>
    <Menu.Item
      name='new'
      as='a'
      href='/post'
    >
      <Icon name='add' />
      <span className='hide-on-mobile'>New</span>
    </Menu.Item>

    <Dropdown
      item
      pointing
      trigger={userAvatar(user.name)}
    >
      <Dropdown.Menu>
        <Dropdown.Header>
          <span className='no-cap'>
            Signed in as <strong>{user.email}</strong>
          </span>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item text='Dashboard' icon='dashboard' onClick={() => {window.location.href = '/'}} />
        <Dropdown.Item text='Profile' icon='user' disabled />
        <Dropdown.Item text='Help' icon='help' />
        <Dropdown.Divider />
        <Dropdown.Item text='Settings' icon='settings' disabled />
        <Dropdown.Item text='Sign Out' icon='sign out' onClick={() => logout()} />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>
)

UserMenu.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default UserMenu;
