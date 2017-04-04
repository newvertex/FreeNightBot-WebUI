import React from 'react';
import { Header, Segment, Form, Input, Button, Message } from 'semantic-ui-react';
import Backend from './../../backend';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
  }

  login = (e) => {
    e.preventDefault();
    this.setState({ error: null });

    Backend.app.authenticate({
      type: 'local',
      'email': this.state.email,
      'password': this.state.password,
    }).then((res) => {
      window.location.href = '/';
    }).catch((err) => {
      this.setState({ error: err, password: '' });
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }

  render() {
    return (
      <div className='login-box'>
        <Segment textAlign='left'>
          <Header textAlign='center'>
            Sign in to FreeNight <small>bot</small>
          </Header>
          <p className='separate-line' />
          <Form onSubmit={this.login}>
            <Form.Field control={Input} label='E-mail' type='email' name='email' value={this.state.email} onChange={this.onChange} required />
            <Form.Field control={Input} label='Password' type='password' name='password' value={this.state.password} onChange={this.onChange} required />
            <Button positive fluid type='submit' content='Sign in' />
          </Form>
          {this.state.error &&
            <Message
              error
              content={this.state.error.message}
            />
          }
        </Segment>
        <Segment textAlign='center' secondary>
          No Account? <a href='help'>Create an account.</a>
        </Segment>
      </div>
    );
  }
}

export default Login;
