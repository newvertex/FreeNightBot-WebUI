import React from 'react';
import { Menu, } from 'semantic-ui-react';

import LinkGenerator from './LinkGenerator';
import EmojiPicker from './EmojiPicker';

class TextEditor extends React.Component {
  state = {
    html: '',
    rtl: false,
    range: undefined,
  }

  componentDidMount() {
    this.refs.editor.innerHTML = this.props.template || "";
  }

  saveRange = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    console.log('here!')
    let sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
      this.setState({ range: sel.getRangeAt(0) });
    }
  }

  restoreRange = () => {
    let sel = window.getSelection();
		if (this.state.range) {
			try {
				sel.removeAllRanges();
		  } catch (ex) {
				document.body.createTextRange().select();
				document.sel.empty();
		  }

		  sel.addRange(this.state.range);
    }
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

  emoji = (emojiChar) => {
    this.restoreRange();
    document.execCommand('insertText', false, ` ${emojiChar.native} `);
  }

  link = (url) => {
    this.restoreRange();
    document.execCommand('createLink', false, url);
  }

  onChange = (e) => {
    this.props.output(this.refs.editor.innerHTML);
  }

  render() {
    return (
      <div>
        <Menu attached="top" icon>
          <Menu.Item as="a" icon="bold" href="bold" onClick={this.format} />
          <Menu.Item as="a" icon="italic" href="italic" onClick={this.format} />

          <Menu.Item as="a" icon="code" href="code" onClick={this.code} />
          <Menu.Item as="a" icon="file code outline" href="pre" onClick={this.code} />

          <LinkGenerator add={this.link} saveRange={this.saveRange} />
          <Menu.Item as="a" icon="unlinkify" href="unlink" onClick={this.format} disabled />

          <Menu.Item as="a" icon="eraser" href="removeFormat" position="right" onClick={this.format} />

        </Menu>

        <div
          contentEditable
          spellCheck={false}
          suppressContentEditableWarning
          className="ui middle attached segment editor"
          dir="auto"
          ref="editor"
          onInput={this.onChange}
        >
        </div>

        <Menu attached="bottom" icon>
          <EmojiPicker add={this.emoji} saveRange={this.saveRange} />
        </Menu>
      </div>
    );
  }

}

export default TextEditor;
