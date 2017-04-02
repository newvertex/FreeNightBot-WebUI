import React, { Component } from 'react';
import feathers from 'feathers-client';
import fetch from 'node-fetch';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import PostEditor from './components/post/editor';

import { tmpBrand, tmpUser, API_URL } from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.server = feathers()
      .configure(feathers.rest(API_URL).fetch(fetch))
      .configure(feathers.hooks())
      .configure(feathers.authentication({
        storage: window.localStorage
      }));
  }

  render() {
    return (
      <div className='main-wrapper'>
        <Header brand={tmpBrand} user={tmpUser} />
        <div className='main-content v-align'>
          <PostEditor server={this.server} />
        </div>
        <Footer brand={tmpBrand} />
      </div>
    );
  }

}

export default App;
