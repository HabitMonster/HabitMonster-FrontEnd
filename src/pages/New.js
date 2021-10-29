import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AddDetail, CategoryList } from '../components/habit';

// state를 공유할 수 있어야 함.
// url 단위로 이동. pages에 저장하지 않았음.
// url 단위로 이동하는 컴포넌트는 state를 공유하게 됨.
// Route component 프랍으로 작성 안함.
// 전부의 chervon: goBack처리를 해줌.

//* 카테고리 리스트 path가 조금 꼬인 것 같은 느낌이 듬.

const initialHabitState = {
  category: '',
  title: '',
  durationStart: '',
  durationEnd: '',
  count: 0,
  sessionDuration: 0,
};

const New = () => {
  const [habit, setHabit] = useState(initialHabitState);

  return (
    <>
      <Route exact path="/new">
        <CategoryList habit={habit} setHabit={setHabit} />
      </Route>
      <Route exact path="/new/detail">
        <AddDetail habit={habit} setHabit={setHabit} />
      </Route>
    </>
  );
};

export default New;
