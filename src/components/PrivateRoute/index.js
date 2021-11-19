import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/states/auth';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLogin, isFirstLogin } = useRecoilValue(authState);

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  if (isFirstLogin) {
    return <Redirect to="/select" />;
  }

  return <Route {...rest}>children</Route>;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
