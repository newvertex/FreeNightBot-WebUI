import React from 'react';
import { Container, Segment, Divider, Header, Form, Button } from 'semantic-ui-react';

import ChoiceType from './ChoiceType';
import ImageUploader from './uploader/ImageUploader';
import ImdbSearch from './imdb';
import ImdbPreview from './imdb/Preview';

import Backend from '../../backend';

const PostTypes = [
  { key: 'text', text: 'Text', value: 'text', icon: 'file text outline' },
  { key: 'photo', text: 'Photo', value: 'photo', icon: 'image' },
];

class CreateNewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newType: 'empty',
      postTitle: '',
      postType: 'text',
      postImage: null,
      postTemplate: undefined,
      addImdb: false,
      movie: null,
      templates: [],  // { key: 'emptyPoster', text: 'Empty Poster', value: 'emptyPoster', 'data-postType': 'photo' },
    };

    this.handleNewType = this.handleNewType.bind(this);
    this.handlePostTitle = this.handlePostTitle.bind(this);
    this.handlePostType = this.handlePostType.bind(this);
    this.handlePostTemplate = this.handlePostTemplate.bind(this);
    this.handleAddImdb = this.handleAddImdb.bind(this);
    this.setMovie = this.setMovie.bind(this);
    this.setPostImage = this.setPostImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getTemplatesList = () => {
    // Get templates list from the server
    Backend.app.service('templates').find({
      query: {
        $select: ['id', 'title', 'postType']
      }
    }).then(res => {
      let templateList = [];
      if (res.data) {
        templateList = res.data.map(t => {
          return { key: t._id, text: t.title, value: t._id, 'data-postType': t.postType };
        });
      }

      this.setState({ templates: templateList });
    });
  }

  handleNewType(e, data) {
    this.setState({
      newType: data.value,
      postType: 'text',
      postTemplate: undefined,
      addImdb: false,
    }, () => {
      if (this.state.newType === 'template' && !this.state.templates.length) {
        this.getTemplatesList();
      }
    });
  }

  handlePostTitle(e, data) {
    this.setState({ postTitle: data.value });
  }

  handlePostType(e, data) {
    this.setState({ postType: data.value });
  }

  handlePostTemplate(e, data) {
    let template = data.options.filter(item => item.value === data.value)[0];

    this.setState({
      postTemplate: data.value,
      postType: template['data-postType'],
    });
  }

  handleAddImdb(e, data) {
    this.setState({ addImdb: data.checked });
  }

  setPostImage(url) {
    this.setState({ postImage: url });
  }

  setMovie(movie) {
    this.setState({ movie });
    this.setPostImage(movie.Poster);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit({ ...this.state });
  }

  isValid = () => {
    let error = false;

    let isPhoto = this.state.postType === 'photo';
    if (isPhoto) {
      error = this.state.postImage ? false : true;
    }

    let isTemplate = this.state.newType === 'template';
    if (isTemplate) {
      error = this.state.postTemplate ? false : true;
    }

    return error;
  }

  render() {
    return (
      <Container text>
        <Segment basic>
          <Header size='large' content='Create a new post' subheader='A post contains Text, Photo, Links and Emoji.' />
          <Divider />
          <Form onSubmit={this.onSubmit}>
            <ChoiceType newType={this.state.newType} onChange={this.handleNewType} />
            <Divider section />

            <Form.Group widths='equal'>
              <Form.Input name='postTitle' placeholder='Post title' label='Post title'
                value={this.state.postTitle} onChange={this.handlePostTitle} />

              {this.state.newType === 'empty'
                ? <Form.Select
                  name='postType'
                  placeholder='Select type of post'
                  label='Type of post'
                  options={PostTypes}
                  value={this.state.postType}
                  onChange={this.handlePostType}
                />
                : <Form.Select
                  name='postTemplate'
                  placeholder='Select post template'
                  label='Post template'
                  options={this.state.templates}
                  value={this.state.postTemplate}
                  onChange={this.handlePostTemplate}
                />
              }
            </Form.Group>

            {
              this.state.newType === 'template'
              && <Form.Group widths='equal'>
                <Form.Checkbox
                  name='addImdb'
                  label='Fill with imdb'
                  value='imdb'
                  checked={this.state.addImdb}
                  onChange={this.handleAddImdb}
                />
                {
                  this.state.addImdb
                  && <ImdbSearch setMovie={this.setMovie} />
                }
              </Form.Group>
            }

            <Divider section />
            <Form.Group widths='equal'>
              <ImageUploader
                postImage={this.state.postImage}
                setPostImage={this.setPostImage}
              />
              {
                this.state.addImdb && this.state.movie
                && <ImdbPreview movie={this.state.movie} />
              }
            </Form.Group>

            <Divider section />
            <Button primary type='submit' disabled={this.isValid()}>Next</Button>
          </Form>
        </Segment>
      </Container>
    );
  }

}

export default CreateNewPost;
