import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Congrats } from '../../assets/images/main';

const LevelUp = ({ onClickSelect, onClickStay }) => {
  return (
    <Container>
      <CongratsImg src={Congrats} alt="" />
      <TextBox>
        <p>축하합니다!</p>
        <span> 최고 레벨에 도달했어요.</span>
      </TextBox>
      <BtnWrap>
        <button onClick={onClickSelect}>다음 몬스터 고르기</button>
        <button onClick={onClickStay}>유지하기</button>
      </BtnWrap>
    </Container>
  );
};

export default LevelUp;

const Container = styled.div`
  width: 100%;
  max-width: 414px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`;

const CongratsImg = styled.img`
  width: 168px;
  height: 168px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 23px 0;
  & p {
    color: var(--color-primary);
    font-size: var(--font-xl);
    line-height: 24px;
    font-weight: var(--weight-bold);
    margin-bottom: 7px;
  }
  & span {
    color: var(--color-primary);
    font-size: var(--font-xs);
    font-weight: var(--weight-semi-regular);
    line-height: 17px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & button {
    cursor: pointer;
    width: 253px;
    height: 47px;
    color: var(--color-white);
    border-radius: var(--border-radius-semi);
    border: none;
    margin: 4px;
    background-color: var(--bg-active);
  }
  & :nth-child(2) {
    background-color: transparent;
  }
`;

LevelUp.propTypes = {
  onClickSelect: PropTypes.func.isRequired,
  onClickStay: PropTypes.func.isRequired,
};
