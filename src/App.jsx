import React, { Component } from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Home from './components/home/Home';
import Help from './components/help/Help';

import { tmpBrand, tmpUser } from './config';

class App extends Component {

  render() {
    return (
      <div className='main-wrapper'>
        <Header brand={tmpBrand} user={tmpUser} />
        <div className='main-content v-align'>
          <Help />
        </div>
        <Footer brand={tmpBrand} />
      </div>
    );
  }

}

export default App;
