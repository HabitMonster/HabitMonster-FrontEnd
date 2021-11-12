import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/states/auth';

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const { isLogin } = useRecoilValue(authState);

  // @SangJoon
  // 렌더링 5~6번 발생
  // 확인 필요

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  comp: PropTypes.elementType,
};

export default PrivateRoute;
