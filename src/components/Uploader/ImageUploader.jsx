import React from 'react';
import { Modal, Header, Button, Divider, Loader, Dimmer, Message } from 'semantic-ui-react';

import ImageBox from './ImageBox';
import InputBox from './InputBox';
import FromWebLink from './FromWebLink';

import imgur from './imgur';

class ImageUploader extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      modalOpen: false,
      uploading: false,
      err: null,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleOpen(e) {
    e.preventDefault();
    this.setState({ modalOpen: true });
  }

  handleClose(e) {
    this.setState({ modalOpen: false });
  }

  uploadImage(file) {
    this.setState({ uploading: true });
    imgur(file)
      .then((res) => res.json())
      .then((res) => {
        let link = res.data.link.replace('http', 'https');
        this.props.setPostImage(link);
        this.setState({
          uploading: false,
          modalOpen: false,
        });
      })
      .catch((err) => {
        this.setState({
          uploading: false,
          error: err,
        });
      })
  }

  render(){
    return(
      <div>
        <Divider section />
        <ImageBox imageUrl={this.props.postImage} onClick={this.handleOpen} />
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          dimmer="blurring"
          size="small"
          closeIcon="close"
        >
          <Header icon="photo" content="Upload picture" />
          <Modal.Content>
            {this.state.err
              && <Message
                    error
                    header="Error on uploading image!"
                    content={this.state.err.message}
                  />
            }

            <InputBox upload={this.uploadImage}/>
            <Divider />
            <FromWebLink setUrl={this.props.setPostImage} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose} primary disabled={this.props.postImage ? false : true}>Add picture</Button>
          </Modal.Actions>
          <Dimmer active={this.state.uploading} inverted>
            <Loader content="Uploading..." size="large" />
          </Dimmer>
        </Modal>
      </div>
    );
  }
}

export default ImageUploader;
