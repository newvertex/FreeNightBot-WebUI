import React, { Component } from 'react';
import { Segment, Loader, Dimmer } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';

import Backend from './backend';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import Help from './components/help';
import Post from './components/post';
import Contact from './components/help/Contact';

import { brand } from './config';

class App extends Component {
  state = {
    isAuth: false,
    user: null,
    renderApp: false,
  }

  componentWillMount() {
    Backend.app.authenticate()
      .then(res => {
        this.setState({
          isAuth: true,
          user: res.data,
        });
        this.renderApp();
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          user: null,
        });
        this.renderApp();
      });
  }

  renderApp = () => {
    setTimeout(() => {
      this.setState({ renderApp: true });
    }, 300);
  }

  render() {
    if (this.state.renderApp) {
      return (
        <div className='main-wrapper'>
          <Header brand={brand} user={this.state.user} isAuth={this.state.isAuth} />
          <div className='main-content v-align'>
            <Route exact path='/' render={() => <Home isAuth={this.state.isAuth} />} />
            <Route path='/login' render={() => (
              !this.state.isAuth ? <Login /> : <Redirect to="/" />
            )} />
            <Route exact path='/post' render={() => (
              this.state.isAuth ? <Post /> : <Redirect to="/login" />
            )} />
            <Route path='/help' component={Help} />
            <Route path='/contact' component={Contact} />
          </div>
          <Footer brand={brand} />
        </div>
      );
    } else {
      return (
        <Segment className='main-wrapper'>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      )
    }
  }

}

export default App;
