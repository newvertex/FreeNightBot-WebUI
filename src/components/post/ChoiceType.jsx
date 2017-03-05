import React from 'react';
import RadioField from '../ui/RadioField';

const ChoiceType = ({ newType, onChange }) => (
  <div>
    <RadioField name='empty' value='empty' icon='file outline' title='Empty'
      description="Empty post without any pre defined content."
      checked={newType === 'empty'}
      onChange={onChange}
    />

    <RadioField name='template' value='template' icon='file code outline' title='From Template'
      description="Create new post from a pre defined template."
      checked={newType === 'template'}
      onChange={onChange}
    />
  </div>
);

ChoiceType.propTypes = {
  newType: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ChoiceType;
