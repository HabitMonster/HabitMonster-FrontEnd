import React, { useRef, useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from '../pages/Loading';

const PrivateRoute = loadable(() => import('./PrivateRoute'));
const Login = loadable(() => import('../pages/Login'));
const Main = loadable(() => import('../pages/Main'));
const Achievement = loadable(() => import('../pages/Achievement'));
const New = loadable(() => import('../pages/New'));
const MyPage = loadable(() => import('../pages/MyPage'));
const HabitDetail = loadable(() => import('../pages/HabitDetail'));
const HabitEdit = loadable(() => import('../pages/HabitEdit'));
const Notice = loadable(() => import('../pages/Notice'));
const Follow = loadable(() => import('../pages/Follow'));
const Select = loadable(() => import('../pages/Select'));
const Search = loadable(() => import('../pages/Search'));
const SearchDetail = loadable(() => import('../pages/SearchDetail'));
const SearchDetailHabit = loadable(() => import('../pages/SearchDetailHabit'));
const SearchDetailFollow = loadable(() =>
  import('../pages/SearchDetailFollow'),
);

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
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" component={Login} />
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
  );
}

export default App;
