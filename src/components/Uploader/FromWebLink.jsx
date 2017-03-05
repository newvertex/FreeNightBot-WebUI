import React from 'react';
import { Input } from 'semantic-ui-react';
import isURL from 'validator/lib/isURL';

class FromWebLink extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
      isOpen: false,
      url: '',
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  open(event) {
    event.preventDefault();
    this.setState({ isOpen: true });
  }

  close(event) {
    event.preventDefault();
    this.setState({ isOpen: false, url: '' });
    this.props.setUrl(null);
  }

  onChange(event, data) {
    let val = data.value;
    this.setState({ url: val });

    let isImage = val.endsWith('jpg') || val.endsWith('jpeg') || val.endsWith('png');

    if (isURL(val) && isImage) {
      this.props.setUrl(val);
    } else {
      this.props.setUrl(null);
    }
  }

  render() {
    return (
      <div className="upload-from-link">
        { !this.state.isOpen
            ? <div>
                <span>You can also provide a <a href="#" onClick={this.open}>link from the web</a>.</span>
              </div>
            : <div>
                <span>Link from the web </span>
                <Input
                  type="text"
                  placeholder="http://example.com/img.png"
                  onChange={this.onChange}
                  value={this.state.url}
                />
                <span> | </span>
                <a href="#" onClick={this.close}>Cancel</a>
              </div>
        }
      </div>
    );
  }

}

export default FromWebLink;
