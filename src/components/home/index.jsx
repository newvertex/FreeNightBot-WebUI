import React from 'react';

import Dashboard from './dashboard/Dashboard';
import Showcase from './showcase/Showcase';

const Home = ({ isAuth }) => (
  <div>
    {isAuth ? <Dashboard /> : <Showcase />}
  </div>
);

Home.propTypes = {
  isAuth: React.PropTypes.bool.isRequired,
};

Home.defaultProps = {
  isAuth: false,
};

export default Home;
