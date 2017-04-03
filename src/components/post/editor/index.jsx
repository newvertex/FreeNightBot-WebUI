import React from 'react';
import { Container, Grid, Form, Select, Button, Segment } from 'semantic-ui-react';

import TextEditor from './TextEditor';
import PostPreview from './PostPreview';

const defaultChannels = { key: 'none', value: 'none', text: 'None' };

class PostEditor extends React.Component {
  state = {
    title: '',
    outputHtml: '',
    showPreview: false,
    channels: [
      defaultChannels,
    ],
    primaryDestination: 'none',
    secondaryDestination: 'none',
  }

  output = (html) => {
    this.setState({ outputHtml: html });
  }

  onPreview = (e, data) => {
    this.setState({ showPreview: data.checked });
  }

  onSelectDestination = (e, data) => {
    this.setState({ [data.name] : data.value });
  }

  onRefreshChannels = (e) => {
    // TODO: get channels list from the server
    // this.setState({ channels: Object.assign({}, defaultChannels, userChannels) });
  }

  renderPreview = () => {
    return (
      <Grid.Column>
        <PostPreview
          type={this.props.postType}
          image={this.props.postImage}
          outputHtml={this.state.outputHtml}
        />
      </Grid.Column>
    );
  }

  renderPublish = () => {
    return (
      <div>
        <p />
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="primaryDestination">Primary destination</label>
                <Select name="primaryDestination" placeholder="Select primary channel/group" options={this.state.channels} onChange={this.onSelectDestination} required />
              </Form.Field>
              <Form.Field>
                <label htmlFor="secondaryDestination">Secondary destination</label>
                <Select name="secondaryDestination" placeholder="Select secondary channel/group" options={this.state.channels} onChange={this.onSelectDestination} />
              </Form.Field>
              <Form.Field width="1">
                <label>Refresh</label>
                <Button icon="refresh" basic />
              </Form.Field>
            </Form.Group>
          </Form>
          <Button onClick={this.onPublish} positive>Publish</Button>
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
                value={this.state.postTitle}
                onChange={(e) => this.setState({ title: e.target.value })} />
            </Form.Field>
          </Form.Group>
        </Form>
        <Grid stackable columns='equal'>
          <Grid.Column>
            <TextEditor server={this.props.server} output={this.output} onPreview={this.onPreview}/>
          </Grid.Column>
          { this.state.showPreview && this.renderPreview() }
        </Grid>
        {this.renderPublish()}
      </Container>  
    );
  }

}

export default PostEditor;
