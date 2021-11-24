import React, { useRef, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy } from '@loadable/component';
import Loading from '../pages/Loading';
import ErrorLog from './ErrorLog';

const PrivateRoute = lazy(() => import('./PrivateRoute'));
const Login = lazy(() => import('../pages/Login'));
const Main = lazy(() => import('../pages/Main'));
const Achievement = lazy(() => import('../pages/Achievement'));
const New = lazy(() => import('../pages/New'));
const MyPage = lazy(() => import('../pages/MyPage'));
const HabitDetail = lazy(() => import('../pages/HabitDetail'));
const HabitEdit = lazy(() => import('../pages/HabitEdit'));
const Notice = lazy(() => import('../pages/Notice'));
const Follow = lazy(() => import('../pages/Follow'));
const Select = lazy(() => import('../pages/Select'));
const Search = lazy(() => import('../pages/Search'));
const SearchDetail = lazy(() => import('../pages/SearchDetail'));
const SearchDetailHabit = lazy(() => import('../pages/SearchDetailHabit'));
const SearchDetailFollow = lazy(() => import('../pages/SearchDetailFollow'));

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

  useEffect(() => {
    const preventShrinkViewportFromKeyboard = function () {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute(
        'content',
        viewport.content + ', height=' + window.innerHeight,
      );
    };

    window.addEventListener('load', preventShrinkViewportFromKeyboard);
    return () =>
      window.removeEventListener('load', preventShrinkViewportFromKeyboard);
  });

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
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
