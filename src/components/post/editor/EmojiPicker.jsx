import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import Trigger from 'rc-trigger';

const EmojiPickerStyle = {
  width: '285px',
  position: 'absolute',
  left: '0',
  bottom: '0',
  zIndex: '9999',
  margin: '10px',
  textAlign: 'left',
};

const builtinPlacements = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
};

function EmojiPicker({ add, saveRange }) {
  return (
    <Trigger
      popupPlacement='bottomLeft'
      action={['click']}
      builtinPlacements={builtinPlacements}
      popup={
        <Picker
          set="emojione"
          emoji="computer"
          title="Pick emoji"
          onClick={add}
          style={EmojiPickerStyle}
        />
      }
    >
      <Menu.Item as="a" icon="smile" href="emoji" onClick={saveRange} />
    </Trigger>
  );
}

export default EmojiPicker;
