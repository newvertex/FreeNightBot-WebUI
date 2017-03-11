import React from 'react';
const TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

class InputBox extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      active: false,
    };

    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.readyToUpload = this.readyToUpload.bind(this);
  }

  onDragOver(event) {
    event.preventDefault();
    this.setState({ active: true });
    return false;
  }

  onDragLeave(event) {
    this.setState({ active: false });
    return false;
  }

  onDrop(event) {
    event.preventDefault();
    this.readyToUpload(event.dataTransfer.files);
  }

  onClick(event) {
    event.stopPropagation();
    this.refs.fileInput.click();
  }

  onChange(event) {
    this.readyToUpload(event.target.files);
    return false;
  }

  readyToUpload(files) {
    let file = files.length ? files[0] : null;

    if (file && TYPES.includes(file.type)) {
      this.props.upload(file);
      this.setState({ active: true })
    } else {
      this.setState({ active: false })
    }
  }

  render(){
    const { active } = this.state;
    return(
        <div
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.onClick}
          className={active ? "upload-drop-zone upload-drop-zone-active" : "upload-drop-zone"}
        >
          <strong>Drag and drop or click here</strong>
          <small>to upload your photo</small>
          <input
            accept={TYPES.join(',')}
            type="file"
            ref="fileInput"
            onChange={this.onChange}
            hidden/>
        </div>
    );
  }
}

export default InputBox;
