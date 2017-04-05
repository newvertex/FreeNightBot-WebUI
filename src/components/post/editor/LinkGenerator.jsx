import React from 'react';
import { Modal, Form, Button, Menu, Dimmer, Loader, Message } from 'semantic-ui-react';
import isURL from 'validator/lib/isURL';
import Backend from './../../../backend';

class LinkGenerator extends React.Component {
  state = {
    open: false,
    url: '',
    loading: false,
    error: null,
  }

  open = (e) => {
    this.props.saveRange(e);
    this.setState({
      open: true,
      url: '',
      loading: false,
      error: null,
    });
  }

  close = () => {
    this.setState({ open: false });
  }

  onUrl = (e, data) => {
    this.setState({ url: data.value });
  }

  shortIt = (e, data) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });

    Backend.app.service('shortener').create({
      url: this.state.url
    }).then(res => {
      this.setState({ url: res.shortUrl, loading: false });
    }).catch(err => {
      this.setState({ loading: false, error: err });
    });
  }

  add = () => {
    this.close();
    this.props.add(this.state.url);
  }

  isValid() {
    return !isURL(this.state.url, { require_protocol: true });
  }

  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.close}
          trigger={<Menu.Item as="a" icon="linkify" href="addLink" onClick={this.open} />}
          closeIcon="close"
          size="small"
          >
          <Modal.Header>
            Add link
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                type="url"
                label="Link address: "
                placeholder="http://example.com"
                required
                value={this.state.url}
                onChange={this.onUrl}
                action={
                  <Button onClick={this.shortIt}
                  disabled={this.isValid()} primary>ShortIt</Button>
                }
              />
            </Form>
            {this.state.error
              && <Message
                    error
                    header="Error"
                    content={this.state.error.message}
                  />
            }
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.add} disabled={this.isValid()}>Add</Button>
          </Modal.Actions>
          <Dimmer active={this.state.loading} inverted>
            <Loader content="Shorten..." size="large" />
          </Dimmer>
        </Modal>
      </div>
    );
  }

}

export default LinkGenerator;
