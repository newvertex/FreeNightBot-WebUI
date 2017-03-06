import React from 'react';
import { Modal, Header, Button, Divider, Loader, Dimmer } from 'semantic-ui-react';

import ImageBox from './ImageBox';
import InputBox from './InputBox';
import FromWebLink from './FromWebLink';

class ImageUploader extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      modalOpen: false,
      uploading: false,
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
    console.log(file);
    this.setState({ uploading: true });
    // TODO: upload file to server and setUrl;
    // FIXME: fake server upload, replace with real image upload
    setTimeout(() => {
      this.props.setPostImage('http://example.com/img.png');
      this.setState({
        uploading: false,
        modalOpen: false,
      });
    }, 5000);
  }

  render(){
    return(
      <div>
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
