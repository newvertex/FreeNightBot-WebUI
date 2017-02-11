import React from 'react';
import { Header, Segment, Form, Input, Button } from 'semantic-ui-react';

const Login = () => (
  <div className='login-box'>
    <Segment textAlign='left'>
      <Header textAlign='center'>
        Sign in to FreeNight <small>bot</small>
      </Header>
      <p className='separate-line'/>
      <Form>
        <Form.Field control={Input} label='Username' type='username' name='username' />
        <Form.Field control={Input} label='Password' type='password' name='password' />
        <Button positive fluid type='submit' content='Sign in' />
      </Form>
    </Segment>
    <Segment textAlign='center' secondary>
      No Account? <a href='help'>Create an account.</a>
    </Segment>
  </div>
);

export default Login;
