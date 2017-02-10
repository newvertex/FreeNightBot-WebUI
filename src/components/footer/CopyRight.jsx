import React from 'react';

const CopyRight = ({ name, link }) => (
  <span>
    © 2017 <a href={link}>{name}</a>.
    <br />
    <span style={{ fontSize: '11px' }}>
      Designed by: <a href='http://github.com/newvertex'>Mojtaba Rabiei</a>
    </span>
  </span>
);

CopyRight.propTypes = {
  name: React.PropTypes.string,
  link: React.PropTypes.string,
};

export default CopyRight;
