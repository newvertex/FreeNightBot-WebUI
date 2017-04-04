import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import Brand from './Brand';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';

const TopMenu = ({ brand, isAuth, user }) => (
  <Menu fluid borderless>
    <Container>
      <Brand logo={brand.logo} title={brand.title} subTitle={brand.subTitle} />

      {isAuth ? <UserMenu user={user} /> : <GuestMenu />}
    </Container>
  </Menu>
);

TopMenu.propTypes = {
  brand: React.PropTypes.object,
  isAuth: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object,
};

TopMenu.defaultProps = {
  isAuth: false,
};

export default TopMenu;
