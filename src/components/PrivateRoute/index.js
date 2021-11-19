import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/states/auth';
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom';

//* Important Note
// 1. Too many Rerender?
// 2. Component match route => Render Component?

const PrivateRoute = ({ component, ...rest }) => {
  const { isLogin, isFirstLogin } = useRecoilValue(authState);
  const location = useLocation();
  const history = useHistory();
  const renderingCount = useRef(1);
  useEffect(() => {
    console.log(
      `%c RENDERING count: ${renderingCount.current}`,
      'color: #f73378',
    );
    renderingCount.current += 1;

    console.log(
      '%c ----------IN THE PRIVATE ROUTE----------',
      'background: #222; color: #00e5ff',
    );
  });

  console.log(
    '%c ----------IN THE PRIVATE ROUTE----------',
    'background: #222; color: #00e5ff',
  );
  console.log(
    `%c The current target is: ${component.type.name}`,
    'color: #f73378',
  );
  console.log(`%c user's isLogin value: ${isLogin}`, 'color: #f73378');
  console.log(
    `%c user's isFirstLogin value: ${isFirstLogin}`,
    'color: #f73378',
  );
  console.log(
    `%c current location path in the privateRoute: ${location.pathname}`,
    'color: #f73378',
  );

  // when user doesn't login, simply pass him/her to login page.
  // the login page must not be wrapped within private route.
  if (!isLogin) {
    console.log(
      `%c if user does not login, WE SHOULD REDIRECT TO LOGIN, CHECK THIS PRIVATE ROUTE!`,
      'color: #f73378',
    );

    return <Redirect to="/login" />;
  }

  // when user does login, and doesn't choose levelOne Character(isFirstLogin = false)
  // and move page via directly typing url, simply pass him/her to select page.
  //*Important Note
  // when user CHANGE mosnter, the isFirstLogin must be true at that time.
  if (isFirstLogin && location.pathname !== '/select') {
    console.log(
      `%c if user DOES login but NOT SELECT MONSTER
  and ENTER the url EXCEPT /select, WE SHOULD REDIRECT TO /select.
  The current location is [${location.pathname}]. CHECK THIS PRIVATE ROUTE!`,
      'color: #f73378',
    );

    return <Redirect to="/select" />;
  }

  // *IMPORTANT NOTE
  // WHEN USER IS CURRENTLY has monster of which level is above 5,
  // The isLogin, isFirstLogin value should be True and False at the moment.
  // I'm not sure but the button will be available and when user click that button
  // History.push('/select', { someState }) will be triggered.
  // BUT, When user just start app and type url 'select', the state should be UNDEFINED.

  if (
    isLogin &&
    !isFirstLogin &&
    location.pathname === '/select' &&
    !history.state
  ) {
    console.log(
      `%c Maybe this time, user level is under five and he/she just typed '/selected' url.
      The state should be undefined so that Program will redirect to root.
      the current state of history is [${location.state}]`,
      'color: #f73378',
    );
    return <Redirect to="/" />;
  }

  return <Route {...rest}>{component}</Route>;
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
