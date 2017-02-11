import React from 'react';
import { Grid } from 'semantic-ui-react';

import CopyRight from './CopyRight';
import SocialLinks from './SocialLinks';
import SimpleMenu from './SimpleMenu';

const Footer = ({ brand }) => (
  <div className='main-footer'>
    <Grid container stackable columns={3} textAlign='center' verticalAlign='middle' className='separate-line'>
      <Grid.Column>
        <CopyRight name={brand.admin.name} link={brand.admin.social.telegram} />
      </Grid.Column>
      <Grid.Column>
        <SocialLinks social={brand.social} />
      </Grid.Column>
      <Grid.Column>
        <SimpleMenu />
      </Grid.Column>
    </Grid>

  </div>
);

export default Footer;
