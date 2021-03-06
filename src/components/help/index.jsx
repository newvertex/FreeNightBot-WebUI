import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import GifPlayer from 'react-gif-player';

import IntroGif from './Intro.gif';
import IntroStill from './Intro.png'
import SignupForWebGif from './SignupForWeb.gif';
import SignupForWebStill from './SignupForWeb.png'

const Help = () => (
  <Container text textAlign='center'>
    <Grid stackable columns='equal' verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column>
          <br />
          <h3>
            FreeNight bot
          </h3>
          <br />
          <GifPlayer gif={IntroGif} still={IntroStill} className="ui middle aligned image" />
          <br />
          <br />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <h3>
            Signup for Web UI
          </h3>
          <p>
            How to create an account to login and use this site?
          </p>
          <br />
          <GifPlayer gif={SignupForWebGif} still={SignupForWebStill} className="ui middle aligned image" />
          <br />
          <br />
          <br />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Help;
