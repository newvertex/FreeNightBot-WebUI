import React from 'react';
import { Menu, Checkbox } from 'semantic-ui-react';

import LinkGenerator from './LinkGenerator';
import EmojiPicker from './EmojiPicker';
import EditorHelp from './Help';

class TextEditor extends React.Component {
  state = {
    html: '',
    rtl: false,
    range: undefined,
    showHelp: false,
  }

  saveRange = (e = null) => {
    if (e) {
      e.preventDefault();
    }

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

  toggleHelp = (e) => {
    e.preventDefault();
    this.setState({ showHelp: !this.state.showHelp });
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
          <Menu.Item as="a" icon="unlinkify" href="unlink" onClick={this.format} />

          <Menu.Item as="a" icon="eraser" href="removeFormat" onClick={this.format} />

          <Menu.Item as="a" icon="help circle outline" href="editorHelp" position="right" active={this.state.showHelp} onClick={this.toggleHelp} />

        </Menu>

        <div
          contentEditable
          spellCheck={false}
          suppressContentEditableWarning
          className="ui middle attached segment editor"
          dir="auto"
          ref="editor"
          onInput={this.onChange}
          dangerouslySetInnerHTML={{ __html: this.props.defaultContent }}
        >
        </div>

        <Menu attached="bottom" icon>
          <EmojiPicker add={this.emoji} saveRange={this.saveRange} />
          <Menu.Item position="right">
            <Checkbox label="Preview" onChange={this.props.onPreview} toggle />
          </Menu.Item>
        </Menu>

        {this.state.showHelp && <EditorHelp />}
      </div>
    );
  }

}

export default TextEditor;
