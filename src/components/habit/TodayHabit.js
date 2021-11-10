import React from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { habitState } from '../../recoil/states/habit';
import useFormatDuration from '../../hooks/useFormatDuration';
import CategoryImage from '../../assets/images/habit';

const TodayHabit = ({ id }) => {
  const habit = useRecoilValue(habitState(id));
  const durationStart = useFormatDuration(habit.durationStart);
  const durationEnd = useFormatDuration(habit.durationEnd);

  return (
    <>
      <Card>
        <DetailContainer>
          <CategoryIcon category={habit.category} />
          <Info>
            <HabitTitle>{habit.title}</HabitTitle>
            <Period>
              {durationStart}~{durationEnd}
            </Period>
          </Info>
          <CountContainer>
            <Count>
              {habit.current}/{habit.count}
            </Count>
          </CountContainer>
        </DetailContainer>
        <CheckBtn>완료하기</CheckBtn>
      </Card>
    </>
  );
};

TodayHabit.propTypes = {
  id: PropTypes.number.isRequired,
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
  cursor: pointer;
`;

export default TodayHabit;
