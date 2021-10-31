import React from 'react';
import styled from 'styled-components';
import { SampleCategory } from '../../assets/images/main';

const HabitCard = () => {
  return (
    <>
      <Card className="card">
        <Wrapper className="wrapper">
          <Period className="period">2021.10.21 - 2021.12.24</Period>
          <DetailBox className="detailBox">
            <CategoryIcon className="categoryIcon" />
            <Info className="info">
              <HabitTitle className="habitTitle">
                30분씩 걷기! 운동하자!!
              </HabitTitle>
              <Progress className="progress">
                <ProgressGauge className="progressGauge" />
              </Progress>
            </Info>
          </DetailBox>
        </Wrapper>
        <CheckBtn className="checkBtn">🔔</CheckBtn>
      </Card>
    </>
  );
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
  font-family: Apple SD Gothic Neo L;
  font-size: var(--font-nano);
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
  font-family: Apple SD Gothic Neo B;
  font-size: var(--font-micro);
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
  background-color: var(--color-gauge);
  border-radius: var(--border-radius-progress);
`;

const CheckBtn = styled.div`
  display: flex;
  align-items: flex-start;
  width: 36px;
  height: 28px;
  padding: 4px 8px;
  background-color: var(--color-gauge);
  border-radius: var(--border-radius-checkBtn);
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

export default HabitCard;
