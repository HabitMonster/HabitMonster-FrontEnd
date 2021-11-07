import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { habitState } from '../../recoil/states/habit';

import styled from 'styled-components';
import A from '../../api/habits';
import { SampleCategory } from '../../assets/images/main';

// 기존 뷰로 보여지는 맥락을 그대로 유지한채, Habit 컴포넌트에 id만 prop으로 주게끔 변경하였습니다.
// 정말 죄송합니다만, 해당 내용에 대해 모르고 삭제하여 밑에 주석으로 해당 컴포넌트 달았습니다. 죄송해요!

const TodayHabit = ({ id }) => {
  // habit:
  /*
    {
      achievePercentage,
      category,
      count,
      current,
      durationStart,
      durationEnd,
      title
    }
  */

  const [habit, setHabit] = useRecoilState(habitState(id));

  // 해당 내용은 따로 건드리지 않겠습니다!
  const checkHabit = async () => {
    const response = await A.checkHabit(habit.habitId);
    setCurrent(response.data.current);

    if (response.data.isAccomplished) {
      setHabitAccomplish({
        habitId: habit.habitId,
      });
    }
  };

  return (
    <>
      <Card className="card">
        <Wrapper className="wrapper">
          <Period className="period">
            {habit.durationStart} - {habit.durationEnd}
          </Period>
          <DetailBox className="detailBox">
            <CategoryIcon className="categoryIcon" />
            <Info className="info">
              <HabitTitle className="habitTitle">{habit.title}</HabitTitle>
              <Progress className="progress">
                <ProgressGauge className="progressGauge" />
              </Progress>
            </Info>
          </DetailBox>
        </Wrapper>
        <CheckBtn
          // prop을 안주었기 때문에 해당 주석을 지우면 오류가 납니다. 수정해주시면 감사하겠습니다!
          // className={accomplished ? 'checkBtn accomplished' : 'checkBtn'}
          onClick={checkHabit}
        >
          🔔
        </CheckBtn>
      </Card>
    </>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 14px 16px;
  background-color: var(--color-white);
  border-radius: calc(var(--size-border-radius) * 2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  height: 52px;
`;

const Period = styled.p`
  width: 256px;
  height: 14px;
  margin-bottom: 7px;
  font-family: var(--font-name-apple);
  font-size: var(--font-nano);
  font-weight: var(--weight-regular);
`;

const DetailBox = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 212px;
  height: 30px;
`;

const CategoryIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background-image: url(${SampleCategory});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const HabitTitle = styled.p`
  width: 212px;
  height: 16px;
  font-family: var(--font-name-apple);
  font-size: var(--font-micro);
  font-weight: var(--weight-bold);
`;

const Progress = styled.div`
  width: 212px;
  height: 8px;
  background-color: var(--color-progressbar);
  border-radius: var(--border-radius-progress);
`;

const ProgressGauge = styled.div`
  width: 39px;
  height: 8px;
  background-color: var(--color-main);
  border-radius: var(--border-radius-progress);
`;

const CheckBtn = styled.div`
  display: flex;
  align-items: flex-start;
  width: 36px;
  height: 28px;
  padding: 4px 8px;
  background-color: var(--color-main);
  border-radius: var(--border-radius-checkBtn);
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

// const [current, setCurrent] = useState(habit.current);
// const setHabitAccomplish = useSetRecoilState(habitAccomplishState);

// const checkHabit = async () => {
//   const response = await A.checkHabit(habit.habitId);
//   setCurrent(response.data.current);

//   if (response.data.isAccomplished) {
//     setHabitAccomplish({
//       habitId: habit.habitId,
//     });
//   }
// };

export default TodayHabit;
