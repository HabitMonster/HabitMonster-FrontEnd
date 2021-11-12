import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/states/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useRecoilValue(authState);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

export default PrivateRoute;
