import React, { useRef, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loading from '../pages/Loading';
import ErrorLog from './ErrorLog';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Achievement from '../pages/Achievement';
import New from '../pages/New';
import MyPage from '../pages/MyPage';
import HabitDetail from '../pages/HabitDetail';
import HabitEdit from '../pages/HabitEdit';
import Notice from '../pages/Notice';
import Follow from '../pages/Follow';
import Select from '../pages/Select';
import Search from '../pages/Search';
import SearchDetail from '../pages/SearchDetail';
import SearchDetailHabit from '../pages/SearchDetailHabit';
import SearchDetailFollow from '../pages/SearchDetailFollow';

function App() {
  const r = useRef(1);

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '%c ----------IN THE APP CONTEXT----------',
      'background: #222; color: #bada55',
    );

    console.log(
      `%c Rendering Count in App.js: << ${r.current} >>`,
      'color: hotpink',
    );

    console.log(
      '%c ----------IN THE APP CONTEXT----------',
      'background: #222; color: #bada55',
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={['/login', '/#']} component={Login} />
          <PrivateRoute path="/select" component={<Select />} />
          <PrivateRoute exact path="/" component={<Main />} />
          <PrivateRoute path="/new" component={<New />} />
          <PrivateRoute path="/achievement" component={<Achievement />} />
          <PrivateRoute path="/mypage" component={<MyPage />} />
          <PrivateRoute exact path="/search" component={<Search />} />
          <PrivateRoute
            exact
            path="/search/:monsterCode"
            component={<SearchDetail />}
          />
          <PrivateRoute
            exact
            path="/search/:monsterCode/:habitId"
            component={<SearchDetailHabit />}
          />
          <PrivateRoute
            exact
            path="/habit/:habitId"
            component={<HabitDetail />}
          />
          <PrivateRoute
            exact
            path="/habit/:habitId/edit"
            component={<HabitEdit />}
          />
          <PrivateRoute path="/notice" component={<Notice />} />
          <PrivateRoute exact path="/follow" component={<Follow />} />
          <PrivateRoute
            exact
            path="/follow/:monsterCode"
            component={<SearchDetailFollow />}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
