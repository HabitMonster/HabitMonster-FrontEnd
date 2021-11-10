import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { getCookie } from '../../utils/cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginCheck = getCookie('accessToken');

  if (!loginCheck) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

export default PrivateRoute;
