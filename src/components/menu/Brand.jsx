import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

const Brand = ({ logo, title, subTitle }) => (
  <Menu.Item header as='a' href='/'>
    <Header as='h4' image={logo}
      content={<div>{title}{subTitle && <small> {subTitle}</small>}</div>} />
  </Menu.Item>
);

Brand.propTypes = {
  logo: React.PropTypes.string,
  title: React.PropTypes.string,
  subTitle: React.PropTypes.string,
};

export default Brand;
