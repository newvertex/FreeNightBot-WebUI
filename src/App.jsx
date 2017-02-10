import React, { Component } from 'react';

import TopMenu from './components/menu/TopMenu';
import logo from './logo.svg';
import img from './img.png';

const tmpUser = {avatar: logo, displayName: 'alex', username: 'alex_jax32'};
const tmpBrand = {logo: img, title: 'FreeNight', subTitle: 'bot'};

class App extends Component {

  render() {
    return (
      <div>
        <TopMenu brand={tmpBrand} user={tmpUser} />
      </div>
    );
  }

}

export default App;
