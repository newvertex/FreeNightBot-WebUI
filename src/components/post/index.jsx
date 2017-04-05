import React from 'react';

import CreateNew from './CreateNew';
import Editor from './editor';

class Post extends React.Component {
  state = {
    data: null,
  }

  setData = (data) => {
    this.setState({ data });
  }

  render() {
    return !this.state.data ? <CreateNew handleSubmit={this.setData} /> : <Editor data={this.state.data} />;
  }
}

export default Post;
