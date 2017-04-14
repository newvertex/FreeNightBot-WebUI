import React from 'react';
import { Container, Grid, Form, Select, Button, Segment, Message, List, Icon } from 'semantic-ui-react';
import Backend from './../../../backend';
import toMarkdown from 'to-markdown';
import * as htmlUtils from './html-utils';

import TextEditor from './TextEditor';
import PostPreview from './PostPreview';

const NOTES = {
  title: 'To save your post as a template you have to set post title.',
  primaryDestination: `To be able publish your post, first select the primary destination. If you haven't any destination key please read help to find how to create one.`,
};

class PostEditor extends React.Component {
  state = {
    title: '',
    defaultContent: '<p>Hello World!</p>',
    output: '<p>Hello World!</p>',
    showPreview: false,
    channels: [], // { key: 'A...', value: '1...', text: 'A...' }
    primaryDestination: undefined,
    loading: false,
    requestResult: null, // { ok: true, message: 'example message' }
  }

  componentWillMount() {
    this.onRefreshChannels();
    // this.props.data containes:
    // newType, postTitle, postType, postImage, postTemplate, addImdb, Movie
    this.setState({ title: this.props.data.postTitle });

    if (this.props.data.newType === 'template') {
      this.getTemplate();
    }
  }

  editorOutput = (html) => {
    let cleanHtml = htmlUtils.stripTags(html, '<p><i><b><a>');
    this.setState({ output: cleanHtml });
  }

  onPreview = (e, data) => {
    this.setState({ showPreview: data.checked });
  }

  onSelectDestination = (e, data) => {
    let currentItem = data.options.filter(item => item.value === data.value)[0];
    this.setState({ primaryDestination: currentItem['data-chatId'] });
  }

  onRefreshChannels = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({ loading: true });

    //get channels list from the server
    Backend.app.service('tusers').find()
      .then(res => {
        let userChannels = [];

        if (res.data.keys) {
          userChannels = res.data.keys.map((item, index) => {
            return { key: index, value: item.key, text: item.key, 'data-chatId': item.kid }
          });
        }

        this.setState({
          channels: userChannels,
          loading: false,
        });
      });
  }

  getTemplate = () => {
    // Get data about template from this.props.data to find tempalte content
    // postTemplate
    Backend.app.service('templates').get(this.props.data.postTemplate)
      .then(res => {
        if (this.props.data.addImdb && this.props.data.movie) {
          this.fillWithImdb(res.content, this.props.data.movie);
        } else {
          this.setState({
            defaultContent: res.content,
            output: res.content,
          });
        }
      });
  }

  fillWithImdb = (tempalte = '', movie) => {
    // Fill the template placeholders with movie
    let content = tempalte;
    for (let value in movie) {
      content = content.replace(`{movie.${value}}`, movie[value]);
    }

    this.setState({
      defaultContent: content,
      output: content,
    });
  }

  onSaveTemplate = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    Backend.app.service('templates').create({
      title: this.state.title,
      content: this.state.output,
      postType: this.props.data.postType,
    }).then(res => {
      this.setState({
        loading: false,
        requestResult: {
          ok: true,
          message: `Template saved successfuly with title: ${this.state.title}.`
        }
      });
      this.autoDismissResult();
    }).catch(err => {
      this.setState({
        loading: false,
        requestResult: {
          ok: false,
          message: `Template can't save, ${err.message}.`
        }
      });
      this.autoDismissResult();
    })
  }

  onPublish = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let msg = toMarkdown(this.state.output, {
      converters: [
        {
          filter: 'b',
          replacement: function (content) {
            return '*' + content + '*';
          }
        },
        {
          filter: 'i',
          replacement: function (content) {
            return '_' + content + '_';
          }
        },
        {
          filter: 'p',
          replacement: function (content) {
            return content + '\n';
          }
        }
      ]
    });
    msg = htmlUtils.htmlspecialchars(htmlUtils.stripTags(msg), null, null, false);
    // this.props.data.[postType, postImage]
    // this.state.[title, primaryDestination, secondaryDestination, postContent]
    Backend.app.service('bot').create({
      type: this.props.data.postType,
      chatId: this.state.primaryDestination,
      photo: this.props.data.postImage,
      message: msg,
      parseMode: 'Markdown', // 'HTML' 'Markdown'
    }).then(res => {
      this.setState({
        loading: false,
        requestResult: {
          ok: true,
          message: 'Post published successfully.'
        }
      });
    }).catch(err => {
      this.setState({
        loading: false,
        requestResult: {
          ok: false,
          message: 'Error on publish!'
        }
      });
    });
  }

  autoDismissResult = () => {
    setTimeout(() => {
      this.setState({ requestResult: null });
    }, 8000);
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

  renderWarning = () => {
    if (!this.state.title || !this.state.primaryDestination) {
      return (
        <Message warning>
          <Message.Header><Icon name="exclamation triangle" /> Note</Message.Header>
          <List bulleted>
            {!this.state.title && <List.Item content={NOTES.title} />}
            {!this.state.primaryDestination && <List.Item content={NOTES.primaryDestination} />}
          </List>
        </Message>
      );
    }

    return null;
  }

  renderPreview = () => {
    return (
      <Grid.Column>
        <PostPreview
          type={this.props.data.postType}
          image={this.props.data.postImage}
          content={this.state.output}
        />
      </Grid.Column>
    );
  }

  renderPublish = () => {
    return (
      <div>
        <p />
        <Segment loading={this.state.loading}>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="primaryDestination">Primary destination</label>
                <Select name="primaryDestination" placeholder="Select primary channel/group" options={this.state.channels} onChange={this.onSelectDestination} required />
              </Form.Field>
              <Form.Field width="1">
                <label>Refresh</label>
                <Button icon="refresh" basic onClick={this.onRefreshChannels} />
              </Form.Field>
            </Form.Group>
          </Form>
          <Button onClick={this.onSaveTemplate} primary disabled={this.state.title ? false : true}>Save as template</Button>
          <Button onClick={this.onPublish} positive disabled={this.state.primaryDestination ? false : true}>Publish</Button>
          {this.renderWarning()}
          {this.renderRequestResult()}
        </Segment>
      </div>
    );
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="postTitle">Post title</label>
              <input name='postTitle' placeholder='Enter current post title'
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })} />
            </Form.Field>
          </Form.Group>
        </Form>
        <Grid stackable columns='equal'>
          <Grid.Column>
            <TextEditor content={this.state.defaultContent} output={this.editorOutput} onPreview={this.onPreview} />
          </Grid.Column>
          {this.state.showPreview && this.renderPreview()}
        </Grid>
        {this.renderPublish()}
      </Container>
    );
  }

}

export default PostEditor;
