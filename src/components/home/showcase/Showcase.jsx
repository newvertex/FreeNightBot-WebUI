import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import Login from '../../login/Login';

const Showcase = () => (
  <div>
    <Grid stackable container centered verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={10}>
          <div>
            <Header size='huge'>
              How people keep update thier Telegram Channel/Group
            </Header>
            <Header>
              <span>Admins or Users use <strong>FreeNight<small>bot</small></strong> to send
                    different type of post to thier channel or group because of
                    powerful Editor and Template system</span>
            </Header>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <Login />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Showcase;
