import React from 'react';
import { Menu, } from 'semantic-ui-react';

class TextEditor extends React.Component {
  state = {
    rtl: false,
  }

  componentDidMount() {
    this.refs.editor.innerHTML = this.props.template;
  }

  format = (e, data) => {
    e.preventDefault();
    document.execCommand(data.href, false, '');
  }

  code = (e, data) => {
    e.preventDefault();
    let text = document.getSelection().toString();
    let tag = data.href;
    document.execCommand('insertHTML', false, `<${tag}>${text}</${tag}>`);
  }

  emoji = () => {
    // TODO: show select emoji box
  }

  link = () => {
    // TODO: show link generator
  }

  render() {
    return (
      <div>
        <Menu attached="top" icon>
          <Menu.Item as="a" icon="bold" href="bold" onClick={this.format} />
          <Menu.Item as="a" icon="italic" href="italic" onClick={this.format} />

          <Menu.Item as="a" icon="code" href="code" onClick={this.code} />
          <Menu.Item as="a" icon="file code outline" href="pre" onClick={this.code} />

          <Menu.Item as="a" icon="linkify" onClick={this.link} disabled />
          <Menu.Item as="a" icon="unlinkify" href="unlink" onClick={this.format} disabled />

          <Menu.Item as="a" icon="eraser" href="removeFormat" position="right" onClick={this.format} />

        </Menu>

        <div
          contentEditable
          spellCheck={false}
          suppressContentEditableWarning
          className="ui middle attached segment editor"
          style={this.state.rtl ? {direction: 'rtl'} : {direction: 'ltr'}}
          ref="editor"
          onInput={this.props.onChange}
        >
        </div>

        <Menu attached="bottom" icon>
          <Menu.Item as="a" icon="smile" onClick={this.emoji}  />

          <Menu.Item as="a" icon="align left" position="right" onClick={() => this.setState({ rtl: false })} />
          <Menu.Item as="a" icon="align right" onClick={() => this.setState({ rtl: true })} />
        </Menu>
      </div>
    );
  }

}

export default TextEditor;
