import React from 'react';
import { Grid, Input } from 'semantic-ui-react';

import TextEditor from './TextEditor';

class PostEditor extends React.Component {
  state = {
    title: '',
    content: '',
  }

  render() {
    return (
      <Grid container stackable columns='equal'>
        <Grid.Column>
          <Input name='postTitle' placeholder='Post title' label='Post title:' fluid
            value={this.state.postTitle}
            onChange={(e, data) => this.setState({ title: data.value })} />
          <br/>
          <TextEditor template={"<b>Hello World!</b>"} />
        </Grid.Column>
        
      </Grid>
    );
  }

}

export default PostEditor;
