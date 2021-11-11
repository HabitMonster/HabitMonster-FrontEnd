import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { habitState, habitsState } from '../../recoil/states/habit';
import { setFormattedDuration } from '../../utils/setFormatDuration';
import useFormatDuration from '../../hooks/useFormatDuration';
import CategoryImage from '../../assets/images/habit';

import { habitApis } from '../../api';
import { OK } from '../../constants/statusCode';
import habit from '../../assets/images/habit';

const TodayHabit = ({ habitId }) => {
  const history = useHistory();
  const [targetIndex, setTargetIndex] = useState(0);

  const [habitList, setHabitList] = useRecoilState(habitsState);
  const habitDetail = useRecoilValue(habitState(habitId));

  // @SangJoon
  // 모든 횟수를 다 채웠을 때 바로 사라지지가 않고 새로고침을 해야 사라지는 이슈가 있습니다.
  // current가 count와 같아지면 페이지를 새로고침하도록 했습니다.
  // 임시방편이라 생각되므로 추후 보완이 필요할 것 같습니다.
  if (habitList[targetIndex].current === habitDetail.count) {
    history.go(0);
  }

  // @SangJoon
  // 기간, 형식(YMD, MD, D), 구분자 ('.' || '-' 등)
  const durationStart = setFormattedDuration(
    habitDetail.durationStart,
    'MD',
    '.',
  );

  const durationEnd = setFormattedDuration(habitDetail.durationEnd, 'MD', '.');

  const clickHandler = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await habitApis.checkHabit(habitId);
      if (data.statusCode === OK) {
        const originHabitList = habitList.slice();
        const targetHabitIndex = habitList.findIndex((habit) => {
          return habit.habitId === habitId;
        });

        setTargetIndex(targetIndex);

        const updatedHabit = {
          ...originHabitList[targetHabitIndex],
          current: originHabitList[targetHabitIndex].current + 1,
        };
        originHabitList[targetHabitIndex] = { ...updatedHabit };
        setHabitList(originHabitList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onHabitClicked = () => {
    history.push({
      pathname: `/habit/${habitId}`,
      state: {
        habit: habitDetail,
      },
    });
  };

  return (
    <>
      <Card onClick={onHabitClicked}>
        <DetailContainer>
          <CategoryIcon category={habitDetail.category} />
          <Info>
            <HabitTitle>{habitDetail.title}</HabitTitle>
            <Period>
              {durationStart}~{durationEnd}
            </Period>
          </Info>
          <CountContainer>
            <Count>
              {habitDetail.current}/{habitDetail.count}
            </Count>
          </CountContainer>
        </DetailContainer>
        <CheckBtn onClick={clickHandler}>완료하기</CheckBtn>
      </Card>
    </>
  );
};

TodayHabit.propTypes = {
  habitId: PropTypes.number,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 146px;
  padding: 24px 24px 24px 17px;
  margin-bottom: 16px;
  font-family: var(--font-name-apple);
  background-color: var(--bg-primary);
  color: var(--color-primary);
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 1;
`;

const DetailContainer = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const CategoryIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 13px;
  background-image: url(${(props) => CategoryImage[props.category].src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 42px;
`;

const HabitTitle = styled.span`
  height: 16px;
  line-height: 19.2px;
  font-size: var(--font-m);
  font-weight: var(--font-weight-bold);
`;

const Period = styled.p`
  width: 256px;
  height: 14px;
  font-size: var(--font-nano);
  font-weight: var(--weight-regular);
  opacity: 0.6;
`;

const CountContainer = styled.div`
  width: 28px;
  height: 17px;
`;

const Count = styled.span`
  line-height: 16.8px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  font-weight: var(--font-weight-semiBold);
`;

const CheckBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 264px;
  height: 40px;
  margin: 16px auto 0 auto;
  background-color: var(--bg-active);
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 5;
  cursor: pointer;
`;

export default TodayHabit;
