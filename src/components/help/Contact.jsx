import React from 'react';
import { Container, Header, Segment, Form, Input, TextArea, Button, Message } from 'semantic-ui-react';
import Backend from './../../backend';

class Contact extends React.Component {
  state = {
    email: '',
    name: '',
    message: 'Hello',
    loading: false,
    requestResult: null,
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    let message = `name: *${this.state.name}*\nemail: *${this.state.email}*\nmessage:\n${this.state.message}`;

    Backend.app.service('bot').create({
      type: 'text',
      photo: null,
      message: message,
      chatId: '62657801'
    }).then((res) => {
      this.setState({
        loading: false,
        requestResult: {
          ok: true,
          message: 'Your message sent to admin successfully.'
        }
      });
    }).catch((err) => {
      this.setState({
        loading: false,
        requestResult: {
          ok: false,
          message: 'Error on contact!'
        }
      });
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      requestResult: null
    });
  }

  renderRequestResult = () => {
    if (this.state.requestResult) {
      if (this.state.requestResult.ok) {
        return <Message header="Success" icon="checkmark" content={this.state.requestResult.message} success />
      } else {
        return <Message header="Error" icon="warning circle" content={this.state.requestResult.message} error />
      }
    }
  }

  render() {
    return (
      <Container>
        <Segment textAlign='left'>
          <Header textAlign='center'>
            Contact to FreeNight <small>admin</small>
          </Header>
          <p className='separate-line' />
          <Form onSubmit={this.submit}>
            <Form.Field control={Input} label='Name' placeholder='Name' type='text' name='name' value={this.state.name} onChange={this.onChange} required />
            <Form.Field control={Input} label='E-mail' placeholder='E-mail' type='email' name='email' value={this.state.email} onChange={this.onChange} required />
            <Form.Field control={TextArea} label='Message' placeholder='Message' name='message' value={this.state.message} onChange={this.onChange} required />
            <Button positive type='submit' content='Submit' />
          </Form>
          {this.renderRequestResult()}
        </Segment>
      </Container>
    );
  }
}

export default Contact;
