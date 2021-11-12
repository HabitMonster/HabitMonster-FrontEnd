import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  SubTitleOuter,
  BottomFixedButton,
  BackButtonHeader,
  Modal,
} from '../components/common';

import { habitState, habitsState } from '../recoil/states/habit';
import { renderDays } from '../utils/date';
import { Trash } from '../assets/icons/common';
import { setFormattedDuration } from '../utils/setFormatDuration';

import { BottomDialog } from '../components/dialog';

import { habitApis } from '../api';
import { OK } from '../constants/statusCode';

const HabitDetail = () => {
  // 습관을 추가하고 새로고침 하지 않은 채 디테일 페이지로 넘어오면
  // /habit/undefined 로 찍히게 됩니다.
  const { habitId } = useParams();
  const history = useHistory();

  const [habitList, setHabitList] = useRecoilState(habitsState);
  const habitDetail = useRecoilValue(habitState(habitId));

  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'YMD',
    '.',
  );
  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'YMD', '.');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = async () => {
    try {
      const { data } = await habitApis.deleteHabit(habitId);

      if (data.statusCode === OK) {
        const deletedHabitIndex = habitList.findIndex((habit) => {
          return habit.habitId === Number(habitId);
        });
        const originHabitList = habitList.slice();
        originHabitList.splice(deletedHabitIndex, 1);
        setHabitList(originHabitList);

        history.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <MenuBar>
          <BackButtonHeader
            onButtonClick={() => history.goBack()}
            pageTitleText="작성한 습관"
          />
          <Trash onClick={() => setDeleteModalOpen(true)} />
        </MenuBar>
        <Wrapper>
          <SubTitleOuter subTitle="제목" clasName="subTitle">
            <p className="content">{habitDetail.title}</p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="내용" clasName="subTitle">
            <p className="content">{habitDetail.description}</p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="기간" clasName="subTitle">
            <p className="content">
              {durationStart} ~ {durationEnd}
            </p>
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="요일" clasName="subTitle">
            {habitDetail.practiceDays.length === 7 ? (
              <p className="content">매주</p>
            ) : (
              <p className="content">
                매일 {renderDays(habitDetail.practiceDays)}
              </p>
            )}
          </SubTitleOuter>
        </Wrapper>
        <Wrapper>
          <SubTitleOuter subTitle="빈도" clasName="subTitle">
            <p className="content">{habitDetail.count}번 씩</p>
          </SubTitleOuter>
        </Wrapper>{' '}
        <BottomFixedButton
          condition={null}
          text="수정하기"
          onClick={() => {
            history.push({
              pathname: `/habit/${habitId}/edit`,
              state: {
                habitDetail,
              },
            });
          }}
        />
        {deleteModalOpen && (
          <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <BottomDialog
              title="습관을 정말 삭제할까요?"
              description="한 번 삭제 후에는 복구되지 않아요! 모든건 삼세번인데, 한 번 다시 생각해보는게 어떨까요!"
              activeButtonText="삭제할래요"
              onClose={() => setDeleteModalOpen(false)}
              onActive={() => handleDeleteButtonClick()}
            />
          </Modal>
        )}
      </Container>
    </>
  );
};

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  margin-top: 24px;
  margin-bottom: 40px;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 12.43px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #070707;
  font-family: var(--font-name-apple);
  color: #f8f8f8;
`;

const Wrapper = styled.div`
  display: flex;
  width: 304px;
  margin-left: 28px;
  margin-bottom: 22px;

  & .subTitle {
    font-weight: 600;
    font-size: 14px;
    line-height: 16.8px;
    color: #7d3cff;
    margin-bottom: 6px;
  }

  & .content {
    font-weight: 400;
  }
`;

export default HabitDetail;
