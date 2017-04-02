import React from 'react';
import { Container, Grid, Checkbox, Dropdown, Button } from 'semantic-ui-react';

import TextEditor from './TextEditor';
import PostPreview from './PostPreview';

class PostEditor extends React.Component {
  state = {
    title: '',
    outputHtml: '',
    showPreview: false,
  }

  output = (html) => {
    this.setState({ outputHtml: html });
  }

  onPreview = (e, data) => {
    this.setState({ showPreview: data.checked });
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

  render() {
    return (
      <Container>
        <div className="editor-title">
          <label htmlFor="postTitle">Post title:</label>
          <input name='postTitle' placeholder='Post title'
            value={this.state.postTitle}
            onChange={(e) => this.setState({ title: e.target.value })} />
          <Checkbox label="Preview" onChange={this.onPreview} toggle />
        </div>
        <br />
        <Grid stackable columns='equal'>
          <Grid.Column>
            <TextEditor server={this.props.server} output={this.output} />
          </Grid.Column>
          { this.state.showPreview && this.renderPreview() }
        </Grid>
      </Container>  
    );
  }

}

export default PostEditor;
