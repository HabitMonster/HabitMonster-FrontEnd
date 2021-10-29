import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import study from '../../assets/images/habit/study.png';
import dimmedEtc from '../../assets/images/habit/etc-dim.png';
import dimmedLife from '../../assets/images/habit/life-dim.png';
import dimmedHobby from '../../assets/images/habit/hobby-dim.png';
import dimmedHealth from '../../assets/images/habit/health-dim.png';
import dimmedEmotion from '../../assets/images/habit/emotion-dim.png';
import dimmedRelationship from '../../assets/images/habit/relationship-dim.png';

import { Back } from '../../assets/icons/common';

const CategoryList = ({ habit }) => {
  const history = useHistory();

  return (
    <Wrapper>
      <IconWrapper>
        <Back />
      </IconWrapper>
      <Helper>
        <h2>
          어떤 <b>습관</b>을 가지고 싶어?
        </h2>
        <p>카테고리를 클릭해서 습관을 작성해주세요🙌</p>
      </Helper>
      <CategoryGrid>
        <GategoryWrapper>
          <img src={dimmedHealth} alt="category" />
          <span>건강</span>
        </GategoryWrapper>
        <GategoryWrapper selected={true}>
          <img src={study} alt="category" />
          <span>공부</span>
        </GategoryWrapper>
        <GategoryWrapper>
          <img src={dimmedLife} alt="category" />
          <span>생활</span>
        </GategoryWrapper>
        <GategoryWrapper>
          <img src={dimmedEmotion} alt="category" />
          <span>감정관리</span>
        </GategoryWrapper>
        <GategoryWrapper>
          <img src={dimmedRelationship} alt="category" />
          <span>관계</span>
        </GategoryWrapper>
        <GategoryWrapper>
          <img src={dimmedHobby} alt="category" />
          <span>취미</span>
        </GategoryWrapper>
        <GategoryWrapper>
          <img src={dimmedEtc} alt="category" />
          <span>기타</span>
        </GategoryWrapper>
      </CategoryGrid>
      <ChoiceButton onClick={() => history.push(`/new/detail`)}>
        선택하기
      </ChoiceButton>
    </Wrapper>
  );
};

CategoryList.propTypes = {
  habit: PropTypes.object.isRequired,
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const IconWrapper = styled.div`
  max-width: 322px;
  height: 40px;
  margin-top: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const Helper = styled.div`
  margin: 12px 0px;
  margin-bottom: 60px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & h2 {
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.374px;
    color: #333333;
    margin-bottom: 12px;

    & b {
      color: #7057fc;
    }
  }

  & p {
    color: #868686;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.374px;
  }
`;

const CategoryGrid = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 22.5px;
  row-gap: 24px;
`;

const GategoryWrapper = styled.div`
  box-sizing: border-box;
  width: 94px;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  background: #ffffff;
  border: 2px solid ${({ selected }) => (selected ? '#7057fc' : '#999999')};
  border-radius: 20px;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    font-size: 13px;
    font-weight: bold;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.374px;
    color: ${({ selected }) => (selected ? '#7057fc' : '#999999')};
  }
`;

const ChoiceButton = styled.button`
  width: 328px;
  height: 56px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 81px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 17px 52px;
  background: #7057fc;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  border: none;
`;

export default CategoryList;
