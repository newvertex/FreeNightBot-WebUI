import React from 'react';
import { Grid, Input } from 'semantic-ui-react';
import toMarkdown from 'to-markdown';

import TextEditor from './TextEditor';

class PostEditor extends React.Component {
  state = {
    title: '',
    outputHtml: '',
    outputMarkdown: '',
  }

  output = (html) => {
    this.setState({ outputHtml: html });
    this.setState({ outputMarkdown: toMarkdown(html) });
  }

  render() {
    return (
      <Grid container stackable columns='equal'>
        <Grid.Column>
          <Input name='postTitle' placeholder='Post title' label='Post title:' fluid
            value={this.state.postTitle}
            onChange={(e, data) => this.setState({ title: data.value })} />
          <br/>
          <TextEditor output={this.output} />
        </Grid.Column>
        {/* <Grid.Column>
          <div dangerouslySetInnerHTML={{ __html: this.state.outputHtml }} dir="auto">
          </div>
          <div dir="auto">
            {this.state.outputMarkdown}
          </div>
        </Grid.Column> */}
      </Grid>
    );
  }

}

export default PostEditor;
