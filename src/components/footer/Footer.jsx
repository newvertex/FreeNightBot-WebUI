import React from 'react';
import { Grid } from 'semantic-ui-react';

import CopyRight from './CopyRight';
import SocialLinks from './SocialLinks';
import SimpleMenu from './SimpleMenu';

const Footer = ({ brand }) => (
  <div className='footer'>
    <Grid container columns={3} verticalAlign='middle' className='separate-line'>
      <Grid.Column textAlign='left'>
        <CopyRight name={brand.admin.name} link={brand.admin.social.telegram} />
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <SocialLinks social={brand.social} />
      </Grid.Column>
      <Grid.Column textAlign='right'>
        <SimpleMenu />
      </Grid.Column>
    </Grid>

  </div>
);

export default Footer;
