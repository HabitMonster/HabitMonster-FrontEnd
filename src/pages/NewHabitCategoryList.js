import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  NewHabitCategoryCell,
  NewHabitCategoryGrid,
  NewHabitCategoryHelperText,
} from '../components/newHabit';
import { Modal } from '../components/common';
import { BottomDialog } from '../components/dialog';
import { useFetchCategories } from '../hooks';

import CATEGORIES from '../assets/images/habit';

const NewHabitCategoryList = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const categories = useFetchCategories();

  const [modalOpen1, setModalOpen1] = useState(false);
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
      {modalOpen1 && (
        <Modal open={modalOpen1} onClose={() => setModalOpen1(false)}>
          <BottomDialog
            title="작성 중인 화면에서 나갈까요?"
            description="현재 작성한 내용은 저장되지 않아요. 저희가 더 노력해서 저장하기 만들어볼게요!"
            activeButtonText="나갈래요"
            onClose={() => setModalOpen1(false)}
            onActive={() => console.log('로그 확인')}
          />
        </Modal>
      )}
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
