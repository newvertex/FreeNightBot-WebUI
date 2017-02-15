import React from 'react';
import { Form, Header } from 'semantic-ui-react';

const RadioField = ({ name, value, checked, onChange, icon, title, description }) => (
  <Form.Radio
    name={name}
    value={value || name}
    checked={checked}
    onChange={onChange}
    className='radio-field'
    label={<label><Header icon={icon} content={title} subheader={description} /></label>}
  />
);

RadioField.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  icon: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
};

RadioField.defaultProps = {
  checked: false,
};

export default RadioField;
