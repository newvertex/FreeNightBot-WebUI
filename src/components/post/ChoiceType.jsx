import React from 'react';
import RadioField from '../ui/RadioField';

const ChoiceType = ({ type, onChange }) => (
  <div>
    <RadioField name='empty' value='empty' icon='file outline' title='Empty'
      description="Empty post without any pre defined content."
      checked={type === 'empty'}
      onChange={onChange}
    />

    <RadioField name='template' value='template' icon='file code outline' title='From Template'
      description="Create new post from a pre defined template."
      checked={type === 'template'}
      onChange={onChange}
    />
  </div>
);

ChoiceType.propTypes = {
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ChoiceType;
