import React, { useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '../components/newHabit';

import CATEGORIES from '../assets/images/habit';

import { useFetchCategories } from '../hooks';

// 테스팅용 모달

import { Modal } from '../components/common';
import { BottomDialog } from '../components/dialog';

const NewHabitCategoryList = () => {
  const { path } = useRouteMatch();
  const categories = useFetchCategories();

  if (localStorage.getItem('isFirstLogin') === 'true') {
    return <Redirect to="/monster" />;
  }

  // 화면나가기 모달 state
  const [modalOpen1, setModalOpen1] = useState(false);

  // 삭제하기 모달 state
  const [modalOpen2, setModalOpen2] = useState(false);

  return (
    <Wrapper>
      <NewHabitCategoryHelperText />
      <NewHabitCategoryGrid>
        {categories.map(({ categoryId, category: categoryName }) => (
          <NewHabitCategoryCell
            key={categoryId}
            src={CATEGORIES[categoryName].src}
            name={CATEGORIES[categoryName].name}
            onClick={() => {
              history.push({
                pathname: `${path}/${categoryId}/preset`,
                state: {
                  id: categoryId,
                  name: CATEGORIES[categoryName].name,
                },
              });
            }}
          />
        ))}
      </NewHabitCategoryGrid>
      {/* 이 클릭 핸들러로 모달 토글함. */}
      {/* onClick Prop 자체를 복사하셔도 됨 */}
      <button onClick={() => setModalOpen1(true)}>
        나가기 버튼 클릭하는거.
      </button>
      {modalOpen1 && (
        <Modal open={modalOpen1} onClose={() => setModalOpen1(false)}>
          <BottomDialog
            title="작성 중인 화면에서 나갈까요?"
            description="현재 작성한 내용은 저장되지 않아요. 저희가 더 노력해서 저장하기 만들어볼게요!"
            activeButtonText="나갈래요"
            // 아니요 버튼을 클릭했을 때 실행할 함수를 onClose에 넣어주면 됩니다.
            onClose={() => setModalOpen1(false)}
            // 보라색 버튼을 클릭했을 때 실행할 함수를 onActive에 넣어주면 됩니다.
            onActive={() => console.log('로그 확인')}
          />
        </Modal>
      )}
      <button onClick={() => setModalOpen2(true)}>이건 지우는 버튼임</button>
      {modalOpen2 && (
        <Modal open={modalOpen2} onClose={() => setModalOpen2(false)}>
          <BottomDialog
            title="습관을 정말 삭제할까요?"
            description="한 번 삭제 후에는 복구되지 않아요! 모든건 삼세번인데, 한 번 다시 생각해보는게 어떨까요!"
            activeButtonText="삭제할래요"
            onClose={() => setModalOpen2(false)}
            onActive={() => console.log('로그 확인')}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 24px;
  background: var(--bg-wrapper);
`;

export default NewHabitCategoryList;
