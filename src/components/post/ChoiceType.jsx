import React from 'react';
import RadioField from '../ui/RadioField';

  <div>
    <RadioField name='empty' value='empty' icon='file outline' title='Empty'
      description="Empty post without any pre defined content."
      onChange={onChange}
    />

    <RadioField name='template' value='template' icon='file code outline' title='From Template'
      description="Create new post from a pre defined template."
      onChange={onChange}
    />
  </div>
);

ChoiceType.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};

export default ChoiceType;
