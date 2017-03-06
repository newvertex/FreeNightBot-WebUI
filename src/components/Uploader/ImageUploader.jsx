import React from 'react';
import { Modal, Header, Button, Divider, Loader, Dimmer } from 'semantic-ui-react';

import InputBox from './InputBox';
import FromWebLink from './FromWebLink';

class ImageUploader extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      modalOpen: false,
      uploading: false,
      imageUrl: null,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleOpen(e) {
    e.preventDefault();
    this.setState({ modalOpen: true });
  }

  handleClose(e) {
    this.setState({
      modalOpen: false,
      imageUrl: null,
     });
  }

  setUrl(url) {
    this.setState({ imageUrl: url });
  }

  uploadImage(file) {
    console.log(file);
    this.setState({ uploading: true });
    // TODO: upload file to server and setUrl;
    // FIXME: fake server upload, replace with real image upload
    setTimeout(() => {
      this.setState({
        modalOpen: false,
        imageUrl: 'http://example.com/img.png'
      });
    }, 5000);
  }

  render(){
    return(
      <div>
        <Button onClick={this.handleOpen}>Upload picture</Button>
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
            <FromWebLink setUrl={this.setUrl} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose} primary disabled={this.state.imageUrl ? false : true}>Add picture</Button>
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
