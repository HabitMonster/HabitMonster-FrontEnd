import React, { useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  SubTitleOuter,
  BottomFixedButton,
  BackButtonHeader,
} from '../components/common';
import useFormatDuration from '../hooks/useFormatDuration';
import { habitState } from '../recoil/states/habit';
import { renderDays } from '../utils/date';
import { Trash } from '../assets/icons/common';

import { Modal } from '../components/common';
import { BottomDialog } from '../components/dialog';

import { habitApis } from '../api';
import { OK } from '../constants/statusCode';

const HabitDetail = () => {
  const { habitId } = useParams();
  const history = useHistory();
  const habitDetail = useRecoilValue(habitState(habitId));

  const durationStart = useFormatDuration(habitDetail.durationStart, 'YMD');
  const durationEnd = useFormatDuration(habitDetail.durationEnd, 'YMD');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // if (localStorage.getItem('isFirstLogin') === 'true') {
  //   return <Redirect to="/monster" />;
  // }

  const handleDeleteButtonClick = async () => {
    try {
      const { data } = await habitApis.deleteHabit(habitId);

      if (data.statusCode === OK) {
        // setHabits([...habits, data.habitDetail]);
        history.replace('/');
        console.log(data);
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
